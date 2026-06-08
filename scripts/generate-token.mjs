import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { validateTokenObject } from './validate-token.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const PACKAGE_VERSION = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')).version

// ===== @ant-design/colors 色板生成算法 =====
// 完整复刻 @ant-design/colors 7.x generate 函数
// 基于 @ant-design/fast-color 的 HSV 色彩空间转换
//
// 与旧 HSL 算法的关键差异：
// 1. 使用 HSV 而非 HSL 色彩空间
// 2. 色相根据冷暖区间旋转（暖色向暖偏，冷色向冷偏）
// 3. 饱和度/明度使用固定阶梯而非线性插值
// 4. 暗色主题通过 bg.mix(pattern, amount) 混色实现，而非 HSL 重映射

const hueStep = 2           // 色相阶梯
const saturationStep = 0.16 // 饱和度阶梯，浅色部分
const saturationStep2 = 0.05 // 饱和度阶梯，深色部分
const brightnessStep1 = 0.05 // 亮度阶梯，浅色部分
const brightnessStep2 = 0.15 // 亮度阶梯，深色部分
const lightColorCount = 5   // 浅色数量，主色上
const darkColorCount = 4    // 深色数量，主色下

// 暗色主题颜色映射关系表
const darkColorMap = [
  { index: 7, amount: 15 },
  { index: 6, amount: 25 },
  { index: 5, amount: 30 },
  { index: 5, amount: 45 },
  { index: 5, amount: 65 },
  { index: 5, amount: 85 },
  { index: 4, amount: 90 },
  { index: 3, amount: 95 },
  { index: 2, amount: 97 },
  { index: 1, amount: 98 },
]

// --- HSV 色相计算（匹配 @ant-design/colors getHue） ---
function antdGetHue(hsv, i, light) {
  let hue
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i
  }
  if (hue < 0) {
    hue += 360
  } else if (hue >= 360) {
    hue -= 360
  }
  return hue
}

// --- HSV 饱和度计算（匹配 @ant-design/colors getSaturation） ---
function antdGetSaturation(hsv, i, light) {
  // 灰色不调整饱和度
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s
  }
  let saturation
  if (light) {
    saturation = hsv.s - saturationStep * i
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep
  } else {
    saturation = hsv.s + saturationStep2 * i
  }
  if (saturation > 1) {
    saturation = 1
  }
  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1
  }
  if (saturation < 0.06) {
    saturation = 0.06
  }
  return Math.round(saturation * 100) / 100
}

// --- HSV 明度计算（匹配 @ant-design/colors getValue） ---
function antdGetValue(hsv, i, light) {
  let value
  if (light) {
    value = hsv.v + brightnessStep1 * i
  } else {
    value = hsv.v - brightnessStep2 * i
  }
  value = Math.max(0, Math.min(1, value))
  return Math.round(value * 100) / 100
}

// --- RGB → HSV（匹配 @ant-design/fast-color 的 getHue/getHSVSaturation/getValue） ---
function rgbToHsv(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h
  if (delta === 0) {
    h = 0
  } else {
    h = Math.round(
      60 * (r === max ? (g - b) / delta + (g < b ? 6 : 0)
           : g === max ? (b - r) / delta + 2
           : (r - g) / delta + 4)
    )
  }
  const s = max === 0 ? 0 : delta / max
  const v = max / 255
  return { h, s, v } // h: 0-360, s: 0-1, v: 0-1
}

// --- HSV → RGB（匹配 @ant-design/fast-color 的 fromHsv） ---
function hsvToRgb(h, s, v) {
  h = ((h % 360) + 360) % 360
  if (s <= 0) {
    const vv = Math.round(v * 255)
    return [vv, vv, vv]
  }
  const hh = h / 60
  const i = Math.floor(hh)
  const ff = hh - i
  const p = Math.round(v * (1.0 - s) * 255)
  const q = Math.round(v * (1.0 - s * ff) * 255)
  const t = Math.round(v * (1.0 - s * (1.0 - ff)) * 255)
  const vv = Math.round(v * 255)
  switch (i) {
    case 0:  return [vv, t, p]
    case 1:  return [q, vv, p]
    case 2:  return [p, vv, t]
    case 3:  return [p, q, vv]
    case 4:  return [t, p, vv]
    case 5:
    default: return [vv, p, q]
  }
}

// --- 混色（匹配 @ant-design/fast-color 的 mix） ---
// result = bg * (1 - p) + fg * p, where p = amount / 100
function mixColors(bgR, bgG, bgB, fgR, fgG, fgB, amount) {
  const p = amount / 100
  return [
    Math.round((fgR - bgR) * p + bgR),
    Math.round((fgG - bgG) * p + bgG),
    Math.round((fgB - bgB) * p + bgB),
  ]
}

// --- Hex → RGB ---
function hexToRgb(hex) {
  if (typeof hex !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error(`Invalid hex color: ${hex} (expected #RRGGBB)`)
  }
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

// --- RGB → Hex ---
function rgbToHex(r, g, b) {
  const toHex = (x) => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// ===== 色板生成主函数 =====
function generatePalette(baseColor, theme = 'light', backgroundColor = null) {
  const [r, g, b] = hexToRgb(baseColor)
  const hsv = rgbToHsv(r, g, b)

  const patterns = []

  // 生成 5 个浅色（index 0-4 → brand.50 ~ brand.400）
  for (let i = lightColorCount; i > 0; i -= 1) {
    const [pr, pg, pb] = hsvToRgb(
      antdGetHue(hsv, i, true),
      antdGetSaturation(hsv, i, true),
      antdGetValue(hsv, i, true),
    )
    patterns.push(rgbToHex(pr, pg, pb))
  }

  // 主色（index 5 → brand.500）
  patterns.push(baseColor.toLowerCase())

  // 生成 4 个深色（index 6-9 → brand.600 ~ brand.900）
  for (let i = 1; i <= darkColorCount; i += 1) {
    const [pr, pg, pb] = hsvToRgb(
      antdGetHue(hsv, i),
      antdGetSaturation(hsv, i),
      antdGetValue(hsv, i),
    )
    patterns.push(rgbToHex(pr, pg, pb))
  }

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  // 暗色主题：用背景色与亮色色板混色
  if (theme === 'dark') {
    const bgHex = backgroundColor || '#141414'
    const [bgR, bgG, bgB] = hexToRgb(bgHex)
    const palette = {}
    darkColorMap.forEach(({ index, amount }, i) => {
      const [fgR, fgG, fgB] = hexToRgb(patterns[index])
      const [mr, mg, mb] = mixColors(bgR, bgG, bgB, fgR, fgG, fgB, amount)
      palette[steps[i]] = rgbToHex(mr, mg, mb)
    })
    return palette
  }

  // 亮色主题：直接使用 patterns
  const palette = {}
  patterns.forEach((color, i) => {
    palette[steps[i]] = color
  })
  return palette
}

function getHslLightness(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return (max + min) / 2 * 100
}

function parseDesignMd(content) {
  const result = { colors: {}, typography: {}, spacing: {}, rounded: {}, components: {}, layoutHints: { containerMaxWidth: null } }

  const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (yamlMatch) {
    const yaml = yamlMatch[1]
    const colorSection = yaml.match(/colors:\s*\n([\s\S]*?)(?=\n\w|\n$)/)
    if (colorSection) {
      const lines = colorSection[1].split('\n')
      lines.forEach(line => {
        const m = line.match(/^\s+([\w-]+):\s*["']?(#[0-9A-Fa-f]{6})["']?/)
        if (m) result.colors[m[1]] = m[2]
      })
    }

    const typoSection = yaml.match(/typography:\s*\n([\s\S]*?)(?=\n\w|\n$)/)
    if (typoSection) {
      const lines = typoSection[1].split('\n')
      let currentScale = null
      lines.forEach(line => {
        const scaleMatch = line.match(/^\s+([\w-]+):\s*\{(.+)\}/)
        if (scaleMatch) {
          const name = scaleMatch[1]
          const props = scaleMatch[2]
          const parsed = {}
          props.split(',').forEach(prop => {
            const [key, val] = prop.split(':').map(s => s.trim())
            if (key && val) parsed[key] = val.replace(/['"]/g, '')
          })
          result.typography[name] = parsed
          currentScale = null
          return
        }
        const scaleDef = line.match(/^\s{2}([\w-]+):\s*$/)
        if (scaleDef) {
          currentScale = scaleDef[1]
          result.typography[currentScale] = {}
          return
        }
        if (currentScale) {
          const propMatch = line.match(/^\s{4}([\w-]+):\s*(.+)/)
          if (propMatch) {
            const key = propMatch[1]
            const val = propMatch[2].trim().replace(/^['"]|['"]$/g, '')
            result.typography[currentScale][key] = val
          }
        }
      })
    }

    const spacingSection = yaml.match(/spacing:\s*\n([\s\S]*?)(?=\n\w|\n$)/)
    if (spacingSection) {
      const lines = spacingSection[1].split('\n')
      lines.forEach(line => {
        const m = line.match(/^\s+([\w-]+):\s*(\d+)px/)
        if (m) result.spacing[m[1]] = parseInt(m[2])
      })
    }

    const roundedSection = yaml.match(/rounded:\s*\n([\s\S]*?)(?=\n\w|\n$)/)
    if (roundedSection) {
      const lines = roundedSection[1].split('\n')
      lines.forEach(line => {
        const m = line.match(/^\s+([\w-]+):\s*(\d+)px/)
        if (m) result.rounded[m[1]] = parseInt(m[2])
      })
    }

    const componentsSection = yaml.match(/components:\s*\n([\s\S]*?)(?=\n[a-zA-Z]|\n$|$)/)
    if (componentsSection) {
      const lines = componentsSection[1].split('\n')
      let currentComponent = null
      lines.forEach(line => {
        const componentMatch = line.match(/^  ([\w-]+):\s*$/)
        if (componentMatch) {
          currentComponent = componentMatch[1]
          result.components[currentComponent] = {}
          return
        }
        if (currentComponent) {
          const propMatch = line.match(/^    ([\w-]+):\s*(.+)/)
          if (propMatch) {
            result.components[currentComponent][propMatch[1]] = propMatch[2].trim().replace(/^['"]|['"]$/g, '')
          }
        }
      })
    }
  }

  const primaryPatterns = [
    /primary:\s*["']?(#[0-9A-Fa-f]{6})["']?/i,
    /brand:\s*["']?(#[0-9A-Fa-f]{6})["']?/i,
    /accent-color:\s*["']?(#[0-9A-Fa-f]{6})["']?/i,
  ]
  if (!result.colors.primary && !result.colors.brand) {
    for (const pattern of primaryPatterns) {
      const m = content.match(pattern)
      if (m) { result.colors.primary = m[1]; break }
    }
  }

  if (!result.colors.primary && !result.colors.brand) {
    const mdPatterns = [
      /\*\*[^*]*Purple[^*]*\*\*\s*\(`(#[0-9A-Fa-f]{6})`\)/i,
      /\*\*[^*]*Brand[^*]*\*\*\s*\(`(#[0-9A-Fa-f]{6})`\)/i,
      /\*\*[^*]*Primary[^*]*\*\*\s*\(`(#[0-9A-Fa-f]{6})`\)/i,
      /`(#[0-9A-Fa-f]{6})`[^`\n]*primary/i,
      /`(#[0-9A-Fa-f]{6})`[^`\n]*brand/i,
      /\(`(#[0-9A-Fa-f]{6})`\)[^`\n]*primary/i,
      /\(`(#[0-9A-Fa-f]{6})`\)[^`\n]*brand/i,
    ]
    for (const pattern of mdPatterns) {
      const m = content.match(pattern)
      if (m) { result.colors.primary = m[1]; break }
    }
  }

  if (!result.colors.canvas && !result.colors.background) {
    const bgPatterns = [
      /Pure White[^`]*`?(#[0-9A-Fa-f]{6})`?/i,
      /canvas[^`]*`?(#[0-9A-Fa-f]{6})`?/i,
      /background[^`]*`?(#[0-9A-Fa-f]{6})`?/i,
      /page background[^`]*`?(#[0-9A-Fa-f]{6})`?/i,
    ]
    for (const pattern of bgPatterns) {
      const m = content.match(pattern)
      if (m) { result.colors.canvas = m[1]; break }
    }
  }

  if (!result.colors.ink) {
    const inkPatterns = [
      /heading[^`]*`?(#[0-9A-Fa-f]{6})`?/i,
      /Deep Navy[^`]*`?(#[0-9A-Fa-f]{6})`?/i,
    ]
    for (const pattern of inkPatterns) {
      const m = content.match(pattern)
      if (m) { result.colors.ink = m[1]; break }
    }
  }

  if (Object.keys(result.typography).length === 0) {
    const mdBody = content.replace(/^---[\s\S]*?---/, '')
    const tableRegex = /\|[\s]*Role[\s]*\|[\s]*Font[\s]*\|[\s]*Size[\s]*\|[\s]*Weight[\s]*\|[\s]*Line[\s]*Height[\s]*\|[\s]*Letter[\s]*Spacing[\s]*\|/i
    const tableMatch = mdBody.match(tableRegex)
    if (tableMatch) {
      const tableStart = mdBody.indexOf(tableMatch[0])
      const afterTable = mdBody.substring(tableStart)
      const rows = afterTable.split('\n')
      let headerFound = false
      for (const row of rows) {
        if (!headerFound) {
          if (row.match(/^\|[\s]*[-:]+[-|\s:]*$/)) headerFound = true
          continue
        }
        const cells = row.split('|').map(c => c.trim()).filter(c => c.length > 0)
        if (cells.length >= 4) {
          const rawName = cells[0].replace(/\*\*/g, '').trim()
          const name = rawName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          const fontSize = cells[2].match(/(\d+(?:\.\d+)?)px/)?.[0]
          const fontWeight = cells[3].match(/(\d+)/)?.[1]
          const lhRaw = cells[4] || ''
          const lineHeight = lhRaw.match(/([\d.]+)/)?.[1]
          const lsRaw = cells[5] || ''
          const letterSpacing = lsRaw.match(/(-?[\d.]+px)/)?.[1]
          const fontFamily = cells[1]?.trim()
          if (fontSize && fontWeight) {
            const parsed = {
              fontSize: fontSize,
              fontWeight: fontWeight,
            }
            if (lineHeight) parsed.lineHeight = lineHeight
            if (letterSpacing) parsed.letterSpacing = letterSpacing
            if (fontFamily) parsed.fontFamily = fontFamily
            result.typography[name] = parsed
          }
        }
        if (!row.startsWith('|')) break
      }
    }
  }

  if (Object.keys(result.typography).length === 0) {
    const mdBody = content.replace(/^---[\s\S]*?---/, '')
    const typoTableRegex = /\|[\s]*(?:Token|Name|Role)[\s]*\|[\s]*(?:Size|Font\s*Size)[\s]*\|[\s]*(?:Weight|Font\s*Weight)[\s]*\|/i
    const tableMatch = mdBody.match(typoTableRegex)
    if (tableMatch) {
      const tableStart = mdBody.indexOf(tableMatch[0])
      const afterTable = mdBody.substring(tableStart)
      const rows = afterTable.split('\n')
      let headerFound = false
      for (const row of rows) {
        if (!headerFound) {
          if (row.match(/^\|[\s]*[-:]+[-|\s:]*$/)) headerFound = true
          continue
        }
        const cells = row.split('|').map(c => c.trim()).filter(c => c.length > 0)
        if (cells.length >= 3) {
          const rawName = cells[0].replace(/\*\*/g, '').replace(/\{[^}]+\}/g, '').trim()
          const name = rawName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          const fontSize = cells[1]?.match(/(\d+(?:\.\d+)?)(?:px|rem)/)?.[0]
          const fontWeight = cells[2]?.match(/(\d+(?:-\d+)?)/)?.[1]
          const lineHeight = cells[3]?.match(/([\d.]+)/)?.[1]
          const letterSpacing = cells[4]?.match(/(-?[\d.]+px|normal)/)?.[1]
          if (fontSize && fontWeight) {
            const parsed = {
              fontSize: fontSize,
              fontWeight: fontWeight.includes('-') ? fontWeight.split('-')[0] : fontWeight,
            }
            if (lineHeight) parsed.lineHeight = lineHeight
            if (letterSpacing && letterSpacing !== 'normal') parsed.letterSpacing = letterSpacing
            result.typography[name] = parsed
          }
        }
        if (!row.startsWith('|')) break
      }
    }
  }

  if (Object.keys(result.colors).length <= 2) {
    const mdBody = content.replace(/^---[\s\S]*?---/, '')
    const colorPatterns = [
      { key: 'success', patterns: [/Success[^`]*`?(#[0-9A-Fa-f]{6})`?/i, /success[^`]*`?(#[0-9A-Fa-f]{6})`?/i] },
      { key: 'danger', patterns: [/Ruby[^`]*`?(#[0-9A-Fa-f]{6})`?/i, /danger[^`]*`?(#[0-9A-Fa-f]{6})`?/i, /error[^`]*`?(#[0-9A-Fa-f]{6})`?/i] },
      { key: 'warning', patterns: [/warning[^`]*`?(#[0-9A-Fa-f]{6})`?/i, /Lemon[^`]*`?(#[0-9A-Fa-f]{6})`?/i] },
      { key: 'ink-muted', patterns: [/Body[^`]*`?(#[0-9A-Fa-f]{6})`?/i, /slate[^`]*`?(#[0-9A-Fa-f]{6})`?/i] },
      { key: 'ink-subtle', patterns: [/Label[^`]*`?(#[0-9A-Fa-f]{6})`?/i] },
    ]
    for (const { key, patterns } of colorPatterns) {
      if (!result.colors[key]) {
        for (const pattern of patterns) {
          const m = mdBody.match(pattern)
          if (m) { result.colors[key] = m[1]; break }
        }
      }
    }
  }

  const mdBody = content.replace(/^---[\s\S]*?---/, '')
  const maxWidthMatch = mdBody.match(/Max (?:content|width)\s*(?:width)?[:\s]*(\d+)px/i)
  if (maxWidthMatch) {
    result.layoutHints.containerMaxWidth = parseInt(maxWidthMatch[1])
  }

  return result
}

function inferComponentSignatures(components) {
  const archetypeRules = [
    { keywords: ['button', 'input', 'toggle', 'tab', 'search'], archetype: 'actionable' },
    { keywords: ['card', 'banner', 'panel', 'tile', 'block', 'strip'], archetype: 'containment' },
    { keywords: ['nav', 'footer', 'sidebar', 'header'], archetype: 'navigation' },
    { keywords: ['badge', 'tag', 'dot', 'status', 'chip'], archetype: 'indicator' },
    { keywords: ['hero', 'illustration', 'mockup', 'screenshot', 'band'], archetype: 'display' },
    { keywords: ['row', 'cell', 'item', 'entry', 'listing'], archetype: 'data' },
  ]

  function getArchetype(name) {
    const lower = name.toLowerCase()
    for (const rule of archetypeRules) {
      if (rule.keywords.some(kw => lower.includes(kw))) return rule.archetype
    }
    return 'containment'
  }

  const signatureKeyAliases = {
    'footer': 'navigation',
    'sidebar': 'navigation',
    'tile': 'card',
    'panel': 'card',
    'block': 'card',
    'strip': 'card',
    'banner': 'hero',
    'band': 'hero',
    'screenshot': 'hero',
    'mockup': 'hero',
    'illustration': 'hero',
    'cell': 'data-row',
    'item': 'data-row',
    'entry': 'data-row',
    'listing': 'data-row',
    'dot': 'badge',
    'status': 'badge',
    'chip': 'badge',
    'tag': 'badge',
    'search': 'input',
    'toggle': 'tab',
  }

  function getSignatureKey(name) {
    const lower = name.toLowerCase()
    if (lower.includes('nav')) return 'navigation'
    if (lower.includes('row')) return 'data-row'
    for (const rule of archetypeRules) {
      if (rule.keywords.some(kw => lower.includes(kw))) {
        const matched = rule.keywords.find(kw => lower.includes(kw))
        return signatureKeyAliases[matched] || matched
      }
    }
    const dashIdx = name.indexOf('-')
    return dashIdx > 0 ? name.substring(0, dashIdx) : name
  }

  function extractTokenKey(ref) {
    if (typeof ref !== 'string') return undefined
    const m = ref.match(/\{(\w+)\.([\w-]+)\}/)
    return m ? m[2] : undefined
  }

  const groups = {}
  for (const [compName, props] of Object.entries(components)) {
    const sigKey = getSignatureKey(compName)
    if (!groups[sigKey]) groups[sigKey] = []
    groups[sigKey].push({ compName, props })
  }

  const signatures = {}
  for (const [sigKey, entries] of Object.entries(groups)) {
    const archetype = getArchetype(entries[0].compName)
    const signature = { archetype }

    for (const entry of entries) {
      if (!signature.borderRadius && entry.props.rounded) {
        signature.borderRadius = extractTokenKey(entry.props.rounded)
      }
      if (!signature.padding && entry.props.padding) {
        signature.padding = entry.props.padding
      }
      if (!signature.height && entry.props.height) {
        signature.height = entry.props.height
      }
      if (!signature.typography && entry.props.typography) {
        signature.typography = extractTokenKey(entry.props.typography)
      }
      if (!signature.border && entry.props.border) {
        signature.border = entry.props.border
      }
    }

    const stateKeyAliases = {
      'active': 'pressed',
      'featured': 'elevated',
      'tertiary': 'ghost',
      'text-link': 'ghost',
      'link': 'ghost',
      'on-dark': 'on-dark',
      'on-light': 'on-light',
    }

    const sigKeyExtraKeywords = {
      'navigation': ['nav'],
      'data-row': ['row'],
      'card': ['tile', 'panel', 'block', 'strip'],
      'hero': ['banner', 'band', 'screenshot', 'mockup', 'illustration'],
      'badge': ['dot', 'status', 'chip', 'tag'],
      'input': ['search'],
      'tab': ['toggle'],
    }

    const sigKeyKeywords = [
      sigKey,
      ...Object.entries(signatureKeyAliases).filter(([, v]) => v === sigKey).map(([k]) => k),
      ...(sigKeyExtraKeywords[sigKey] || []),
    ]

    function computeStateKey(compName) {
      let remainder = compName
      for (const kw of sigKeyKeywords) {
        const patterns = [kw + '-', '-' + kw, kw]
        for (const pat of patterns) {
          if (remainder === pat) return 'default'
          if (remainder.includes(pat)) {
            remainder = remainder.replace(pat, '').replace(/^-|-$/g, '')
          }
        }
      }
      if (!remainder) return 'default'
      if (stateKeyAliases[remainder]) return stateKeyAliases[remainder]
      const parts = remainder.split('-')
      const normalizedParts = parts.map(p => stateKeyAliases[p] || p)
      return normalizedParts.join('-')
    }

    const states = {}
    for (const entry of entries) {
      const stateKey = computeStateKey(entry.compName)
      const state = {}
      if (entry.props.backgroundColor) state.backgroundColor = entry.props.backgroundColor
      if (entry.props.textColor) state.textColor = entry.props.textColor
      if (entry.props.border) state.border = entry.props.border
      if (entry.props.boxShadow) state.boxShadow = entry.props.boxShadow
      if (entry.props.opacity) state.opacity = entry.props.opacity
      states[stateKey] = state
    }
    signature.states = states
    signatures[sigKey] = signature
  }

  return { signatures }
}

function mapToToken(design, brandName, theme, sourcePath, platform = 'desktop') {
  const templateFileMap = {
    'desktop-dark': 'dark-theme.template.json',
    'desktop-light': 'light-theme.template.json',
    'mobile-dark': 'mobile-dark.template.json',
    'mobile-light': 'mobile-light.template.json',
    'dashboard-dark': 'dashboard-dark.template.json',
  }
  const templateKey = `${platform}-${theme}`
  const templateFileName = templateFileMap[templateKey]
  if (!templateFileName) {
    console.error(`Error: No template for platform="${platform}" theme="${theme}". Available: ${Object.keys(templateFileMap).join(', ')}`)
    process.exit(1)
  }
  const templatePath = resolve(ROOT, 'templates', templateFileName)
  const template = JSON.parse(readFileSync(templatePath, 'utf-8'))

  const primary = design.colors.primary || design.colors.brand || design.colors['accent-color']
  if (!primary) {
    console.error('Error: No primary/brand color found in DESIGN.md')
    process.exit(1)
  }

  // 先确定 surface.base（暗色主题色板生成需要背景色）
  const surface = { ...template.colors.surface }
  if (design.colors.canvas) surface.base = design.colors.canvas
  else if (design.colors.background) surface.base = design.colors.background

  // 暗色主题传递 backgroundColor 给 generatePalette，复刻 @ant-design/colors 的暗色混色算法
  const brand = generatePalette(primary, theme, theme === 'dark' ? surface.base : null)
  // 暗色主题下 primary-hover/primary-focus 可覆盖算法生成的 brand.400/brand.600
  if (design.colors['primary-hover']) brand['400'] = design.colors['primary-hover']
  if (design.colors['primary-focus']) brand['600'] = design.colors['primary-focus']
  if (design.colors['surface-1']) surface['1'] = design.colors['surface-1']
  else if (design.colors['soft-cloud']) surface['1'] = design.colors['soft-cloud']
  else if (design.colors['surface-raised']) surface['1'] = design.colors['surface-raised']
  if (design.colors['surface-2']) surface['2'] = design.colors['surface-2']
  else if (design.colors['surface-overlay']) surface['2'] = design.colors['surface-overlay']
  if (design.colors['surface-3']) surface['3'] = design.colors['surface-3']
  else if (design.colors['surface-sunken']) surface['3'] = design.colors['surface-sunken']
  if (design.colors['surface-4']) surface['4'] = design.colors['surface-4']

  const ink = { ...template.colors.ink }
  if (design.colors.ink) ink.default = design.colors.ink
  else if (design.colors.foreground) ink.default = design.colors.foreground
  else if (design.colors['text-primary']) ink.default = design.colors['text-primary']
  if (design.colors['ink-muted']) ink.muted = design.colors['ink-muted']
  else if (design.colors['foreground-muted']) ink.muted = design.colors['foreground-muted']
  else if (design.colors.mute) ink.muted = design.colors.mute
  else if (design.colors.body) ink.muted = design.colors.body
  if (design.colors['ink-subtle']) ink.subtle = design.colors['ink-subtle']
  else if (design.colors['text-tertiary']) ink.subtle = design.colors['text-tertiary']
  else if (design.colors['text-secondary']) ink.subtle = design.colors['text-secondary']
  if (design.colors['ink-tertiary']) ink.tertiary = design.colors['ink-tertiary']
  else if (design.colors['text-quaternary']) ink.tertiary = design.colors['text-quaternary']

  const border = { ...template.colors.border }
  if (design.colors.hairline) border.default = design.colors.hairline
  else if (design.colors.border) border.default = design.colors.border
  else if (design.colors.divider) border.default = design.colors.divider
  if (design.colors['hairline-strong']) border.strong = design.colors['hairline-strong']
  if (design.colors['hairline-tertiary']) border.subtle = design.colors['hairline-tertiary']

  const semantic = { ...template.colors.semantic }
  if (design.colors['semantic-success'] || design.colors.success) semantic.success = design.colors['semantic-success'] || design.colors.success
  if (design.colors.danger || design.colors.error) semantic.danger = design.colors.danger || design.colors.error
  if (design.colors.warning) semantic.warning = design.colors.warning
  if (design.colors.info) semantic.info = design.colors.info
  if (!semantic.info && primary) semantic.info = primary

  const fontFamilies = { ...template.typography.fontFamilies }
  const isDesktop = platform === 'desktop'

  // fontFamilies: all platforms share brand fonts from DESIGN.md
  const brandFontKeys = new Set()
  for (const [name, props] of Object.entries(design.typography)) {
    if (props.fontFamily) {
      const familyKey = mapFontFamilyKey(props.fontFamily)
      const rawFamily = props.fontFamily
      const isFullStack = rawFamily.includes(',')
      const primaryName = isFullStack ? rawFamily.split(',')[0].trim().replace(/^['"]|['"]$/g, '') : rawFamily.trim()
      const stack = isFullStack ? rawFamily : `'${rawFamily.trim()}', sans-serif`
      if (!brandFontKeys.has(familyKey) || stack.length > fontFamilies[familyKey].stack.length) {
        fontFamilies[familyKey] = { name: primaryName, stack }
        brandFontKeys.add(familyKey)
      }
    }
  }

  // scales: desktop uses DESIGN.md values, non-desktop uses template defaults
  let scales
  if (isDesktop) {
    scales = {}
    const scaleFontKeys = new Set()
    for (const [name, props] of Object.entries(design.typography)) {
      const scaleName = mapScaleName(name)
      if (scaleName && props.fontSize) {
        if (!scales[scaleName]) {
          scales[scaleName] = {
            fontSize: props.fontSize.includes('px') ? props.fontSize : props.fontSize + 'px',
            fontWeight: parseInt(props.fontWeight) || 400,
            lineHeight: parseFloat(props.lineHeight) || 1.5,
          }
          if (props.letterSpacing) {
            scales[scaleName].letterSpacing = props.letterSpacing.includes('px') ? props.letterSpacing : props.letterSpacing + 'px'
          }
        }
        if (props.fontFamily && !scales[scaleName].fontFamily) {
          scales[scaleName].fontFamily = mapFontFamilyKey(props.fontFamily)
          scaleFontKeys.add(scaleName)
        }
        if (props.textTransform && !scales[scaleName].textTransform) {
          scales[scaleName].textTransform = props.textTransform
        }
      }
    }
    for (const [key, val] of Object.entries(template.typography.scales)) {
      if (!scales[key]) {
        scales[key] = val
      }
    }
  } else {
    scales = { ...template.typography.scales }
  }

  // spacing: desktop uses DESIGN.md values, non-desktop uses template defaults
  const spacing = isDesktop
    ? (() => {
        const s = { ...template.spacing }
        for (const [name, val] of Object.entries(design.spacing)) {
          const key = mapSpacingKey(name)
          if (key) s[key] = val
        }
        return s
      })()
    : { ...template.spacing }

  const borderRadius = isDesktop
    ? (() => {
        const b = { ...template.borderRadius }
        for (const [name, val] of Object.entries(design.rounded)) {
          const key = mapRadiusKey(name)
          if (key) b[key] = val
        }
        return b
      })()
    : { ...template.borderRadius }

  const meta = {
    name: `${brandName}-${theme}`,
    version: PACKAGE_VERSION,
    source: sourcePath,
    theme,
    platform,
  }

  const layoutDefaults = {
    desktop: { containerMaxWidth: 1280, navHeight: 56, sectionSpacing: 96 },
    mobile: { containerMaxWidth: 640, navHeight: 56, sectionSpacing: 64 },
    dashboard: { containerMaxWidth: 1920, navHeight: 64, sectionSpacing: 64 },
  }
  const layout = template.layout ? { ...template.layout } : { ...layoutDefaults[platform] }
  if (!layout.containerMaxWidth) layout.containerMaxWidth = layoutDefaults[platform].containerMaxWidth
  if (!layout.navHeight) layout.navHeight = layoutDefaults[platform].navHeight
  if (!layout.sectionSpacing) layout.sectionSpacing = layoutDefaults[platform].sectionSpacing
  if (design.layoutHints && design.layoutHints.containerMaxWidth) {
    layout.containerMaxWidth = design.layoutHints.containerMaxWidth
  }
  if (design.components) {
    for (const [compName, props] of Object.entries(design.components)) {
      if (compName.includes('nav') && props.height) {
        layout.navHeight = parseInt(props.height.replace(/px$/, ''))
        break
      }
    }
  }
  if (design.spacing) {
    if (design.spacing.section) layout.sectionSpacing = design.spacing.section
    else if (design.spacing.xxl) layout.sectionSpacing = design.spacing.xxl
  }

  const componentGrammar = (design.components && Object.keys(design.components).length > 0)
    ? inferComponentSignatures(design.components)
    : null

  const extendedTransitions = {
    ...template.transitions,
    "expand": { "duration": "200ms", "easing": "ease-in-out" },
    "collapse": { "duration": "150ms", "easing": "ease-in" },
    "modal-enter": { "duration": "280ms", "easing": "ease-out" },
    "modal-exit": { "duration": "180ms", "easing": "ease-in" },
    "toast-enter": { "duration": "300ms", "easing": "ease-out" },
    "toast-exit": { "duration": "200ms", "easing": "ease-in" },
    "scroll-reveal": { "duration": "500ms", "easing": "cubic-bezier(0.16,1,0.3,1)" },
  }

  const result = {
    meta,
    colors: { brand, surface, ink, border, semantic },
    typography: { fontFamilies, scales },
    spacing,
    borderRadius,
    shadows: template.shadows,
    transitions: extendedTransitions,
  }
  if (template.viewport) {
    result.viewport = template.viewport
  }
  result.layout = layout
  if (componentGrammar) {
    result.componentGrammar = componentGrammar
  }
  return result
}

function mapScaleName(name) {
  const map = {
    'display-campaign': 'display-xl',
    'display-xxl': 'display-xl',
    'display-xl': 'display-xl',
    'display-hero': 'display-xl',
    'display-lg': 'display-lg',
    'display-large': 'display-lg',
    'display-md': 'display-md',
    'display-sm': 'display-md',
    'display-mega': 'display-xl',
    'hero-display': 'display-xl',
    'product-display': 'display-lg',
    'section-display': 'display-lg',
    'section-heading': 'display-md',
    'stat-display': 'display-md',
    'number-display': 'display-md',
    'rating-display': 'display-md',
    'headline': 'headline',
    'heading-1': 'headline',
    'heading-2': 'heading-xl',
    'heading-xl': 'heading-xl',
    'sub-heading-large': 'heading-xl',
    'subhead': 'heading-xl',
    'feature-heading': 'heading-xl',
    'heading-3': 'heading-lg',
    'heading-lg': 'heading-lg',
    'sub-heading': 'heading-lg',
    'card-title': 'heading-lg',
    'card-heading': 'heading-lg',
    'subtitle': 'heading-lg',
    'title-lg': 'heading-lg',
    'heading-4': 'heading-md',
    'heading-md': 'heading-md',
    'heading-sm': 'heading-md',
    'title-md': 'heading-md',
    'title-sm': 'heading-md',
    'heading-5': 'body-lg',
    'body-lg': 'body-lg',
    'body-large': 'body-lg',
    'body': 'body-md',
    'body-md': 'body-md',
    'body-md-bold': 'body-md',
    'body-md-medium': 'body-md',
    'body-strong': 'body-md',
    'body-tracked': 'body-md',
    'body-sm': 'body-sm',
    'body-small': 'body-sm',
    'body-sm-medium': 'body-sm',
    'body-sm-strong': 'body-sm',
    'caption': 'caption',
    'caption-md': 'caption',
    'caption-sm': 'caption',
    'caption-bold': 'caption',
    'caption-strong': 'caption',
    'caption-tight': 'caption',
    'caption-uppercase': 'caption',
    'caption-tabular': 'caption',
    'caption-small': 'caption',
    'label-md': 'caption',
    'label-sm': 'caption',
    'eyebrow': 'eyebrow',
    'micro': 'micro',
    'micro-label': 'micro',
    'micro-uppercase': 'micro',
    'micro-tabular': 'micro',
    'uppercase-tag': 'micro',
    'utility-xs': 'micro',
    'nano': 'micro',
    'button': 'button',
    'button-md': 'button',
    'button-sm': 'button',
    'button-lg': 'button',
    'nav-link': 'button',
    'link': 'body-md',
    'mono': 'mono',
    'code': 'mono',
    'code-md': 'mono',
    'code-sm': 'mono',
    'code-body': 'mono',
    'code-bold': 'mono',
    'code-label': 'mono',
    'code-micro': 'mono',
    'mono-label': 'mono',
    'link-emph': 'body-md',
    'link-md': 'body-md',
  }
  return map[name] || name
}

function mapFontFamilyKey(fontFamily) {
  const lower = fontFamily.toLowerCase()
  if (lower.includes('display') || lower.includes('futura') || lower.includes('campaign') || lower.includes('walsh') || lower.includes('walsheim') || lower.includes('gothic') || lower.includes('sohne')) return 'display'
  if (lower.includes('mono') || lower.includes('code') || lower.includes('source')) return 'mono'
  return 'body'
}

function mapSpacingKey(name) {
  const nameMap = {
    'xxs': '1', 'hair': '1',
    'xs': '2',
    'sm': '3',
    'md': '4', 'base': '4',
    'lg': '6',
    'xl': '8',
    'xxl': '12',
  }
  return nameMap[name] || null
}

function mapRadiusKey(name) {
  const nameMap = {
    'none': 'none', 'xs': 'xs',
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg',
    'xl': 'xl',
    'xxl': '2xl',
    'pill': 'full', 'full': 'full',
  }
  return nameMap[name] || null
}

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
Usage: node generate-token.mjs <design-md-path> [--theme dark|light] [--platform desktop|mobile|dashboard] [--name <brand-name>] [--output <path>]

Options:
  --theme    Theme mode (dark|light), auto-detected from surface.base luminance if not specified
  --platform Target platform (desktop|mobile|dashboard), default: desktop
  --name     Brand name for meta.name (default: derived from file path)
  --output   Output file path (default: stdout)

Examples:
  node generate-token.mjs ../references/brand-library/developer-tools/linear.app-DESIGN.md
  node generate-token.mjs ../references/brand-library/fintech/stripe-DESIGN.md --theme light
  node generate-token.mjs ./DESIGN.md --name my-brand --platform mobile --output ./token.json
  node generate-token.mjs ./DESIGN.md --platform dashboard --theme dark
`)
    process.exit(0)
  }

  const designPath = resolve(args[0])
  let theme = null
  let platform = 'desktop'
  let brandName = null
  let outputPath = null

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--theme' && args[i + 1]) { theme = args[++i] }
    else if (args[i] === '--platform' && args[i + 1]) { platform = args[++i] }
    else if (args[i] === '--name' && args[i + 1]) { brandName = args[++i] }
    else if (args[i] === '--output' && args[i + 1]) { outputPath = resolve(args[++i]) }
  }

  if (!brandName) {
    const parts = designPath.split('/')
    const fileName = parts[parts.length - 1]
    brandName = fileName.replace('-DESIGN.md', '').replace('.md', '')
  }

  if (!existsSync(designPath)) {
    console.error(`Error: File not found: ${designPath}`)
    process.exit(1)
  }

  const content = readFileSync(designPath, 'utf-8')
  const design = parseDesignMd(content)

  if (!theme) {
    const baseColor = design.colors.canvas || design.colors.background || '#ffffff'
    const hslLightness = getHslLightness(baseColor)
    theme = hslLightness < 50 ? 'dark' : 'light'
  }

  if (platform === 'dashboard' && theme === 'light') {
    console.error('Error: Dashboard platform only supports dark theme. Remove --theme light or use --theme dark.')
    process.exit(1)
  }

  const token = mapToToken(design, brandName, theme, args[0], platform)

  const schemaPath = resolve(ROOT, 'schema', 'design-token.schema.json')
  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'))
  const { errors, warnings } = validateTokenObject(token, schema)
  if (warnings.length > 0) {
    console.log(`⚠️  Warnings (${warnings.length}):`)
    warnings.forEach(w => console.log(`  - ${w}`))
  }
  if (errors.length > 0) {
    console.error('Validation errors:')
    errors.forEach(e => console.error(`  - ${e}`))
    process.exit(1)
  }

  const json = JSON.stringify(token, null, 2)

  if (outputPath) {
    writeFileSync(outputPath, json, 'utf-8')
    console.log(`Token generated: ${outputPath}`)
    console.log(`Brand: ${brandName}, Theme: ${theme}, Platform: ${platform}`)
  } else {
    console.log(json)
  }
}

main()
