import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

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

function getLuminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const toLinear = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function parseDesignMd(content) {
  const result = { colors: {}, typography: {}, spacing: {}, rounded: {} }

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

  return result
}

function mapToToken(design, brandName, theme, sourcePath) {
  const templatePath = resolve(ROOT, 'templates', theme === 'dark' ? 'dark-theme.template.json' : 'light-theme.template.json')
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
  if (design.colors['surface-raised']) surface['1'] = design.colors['surface-raised']
  if (design.colors['surface-overlay']) surface['2'] = design.colors['surface-overlay']
  if (design.colors['soft-cloud']) surface['1'] = design.colors['soft-cloud']
  if (design.colors['surface-1']) surface['1'] = design.colors['surface-1']
  if (design.colors['surface-2']) surface['2'] = design.colors['surface-2']
  if (design.colors['surface-3']) surface['3'] = design.colors['surface-3']
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
  if (design.colors['ink-tertiary']) ink.tertiary = design.colors['ink-tertiary']

  const border = { ...template.colors.border }
  if (design.colors.hairline) border.default = design.colors.hairline
  else if (design.colors.border) border.default = design.colors.border
  else if (design.colors.divider) border.default = design.colors.divider
  if (design.colors['hairline-strong']) border.strong = design.colors['hairline-strong']
  if (design.colors['hairline-tertiary']) border.subtle = design.colors['hairline-tertiary']

  const semantic = { ...template.colors.semantic }
  if (design.colors['semantic-success'] || design.colors.success) semantic.success = design.colors['semantic-success'] || design.colors.success
  if (design.colors.sale || design.colors.danger || design.colors.error) semantic.danger = design.colors.sale || design.colors.danger || design.colors.error
  if (design.colors.warning) semantic.warning = design.colors.warning
  if (design.colors.info) semantic.info = design.colors.info

  const fontFamilies = { ...template.typography.fontFamilies }
  const scales = { ...template.typography.scales }
  const brandFontKeys = new Set()

  for (const [name, props] of Object.entries(design.typography)) {
    const scaleName = mapScaleName(name)
    if (scaleName && props.fontSize) {
      scales[scaleName] = {
        fontSize: props.fontSize.includes('px') ? props.fontSize : props.fontSize + 'px',
        fontWeight: parseInt(props.fontWeight) || 400,
        lineHeight: parseFloat(props.lineHeight) || 1.5,
      }
      if (props.letterSpacing) {
        scales[scaleName].letterSpacing = props.letterSpacing.includes('px') ? props.letterSpacing : props.letterSpacing + 'px'
      }
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
        scales[scaleName].fontFamily = familyKey
      }
      if (props.textTransform) {
        scales[scaleName].textTransform = props.textTransform
      }
    }
  }

  const spacing = { ...template.spacing }
  for (const [name, val] of Object.entries(design.spacing)) {
    const key = mapSpacingKey(name, val)
    spacing[key] = val
  }

  const borderRadius = { ...template.borderRadius }
  for (const [name, val] of Object.entries(design.rounded)) {
    if (val === 0) continue
    const key = mapRadiusKey(name, val)
    borderRadius[key] = val
  }

  return {
    meta: {
      name: `${brandName}-${theme}`,
      version: '1.0.0',
      source: sourcePath,
      theme,
    },
    colors: { brand, surface, ink, border, semantic },
    typography: { fontFamilies, scales },
    spacing,
    borderRadius,
    shadows: template.shadows,
    transitions: template.transitions,
  }
}

function mapScaleName(name) {
  const map = {
    'display-campaign': 'display-xl',
    'display-xxl': 'display-xl',
    'display-xl': 'display-xl',
    'display-lg': 'display-lg',
    'display-md': 'display-md',
    'display-sm': 'display-md',
    'display-mega': 'display-xl',
    'hero-display': 'display-xl',
    'product-display': 'display-lg',
    'section-display': 'display-lg',
    'stat-display': 'display-md',
    'number-display': 'display-md',
    'rating-display': 'display-md',
    'headline': 'headline',
    'heading-1': 'headline',
    'heading-2': 'heading-xl',
    'heading-xl': 'heading-xl',
    'sub-heading-large': 'heading-xl',
    'subhead': 'heading-xl',
    'section-heading': 'heading-xl',
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
    'label-md': 'caption',
    'label-sm': 'caption',
    'eyebrow': 'caption',
    'micro': 'caption',
    'micro-label': 'caption',
    'micro-uppercase': 'caption',
    'uppercase-tag': 'caption',
    'utility-xs': 'caption',
    'button': 'button',
    'button-md': 'button',
    'button-sm': 'button',
    'button-lg': 'button',
    'nav-link': 'button',
    'mono': 'mono',
    'code': 'mono',
    'code-md': 'mono',
    'code-sm': 'mono',
    'mono-label': 'mono',
    'link': 'body-md',
    'link-emph': 'body-md',
    'link-md': 'body-md',
  }
  return map[name] || null
}

function mapFontFamilyKey(fontFamily) {
  const lower = fontFamily.toLowerCase()
  if (lower.includes('display') || lower.includes('futura') || lower.includes('campaign') || lower.includes('walsh') || lower.includes('walsheim') || lower.includes('gothic')) return 'display'
  if (lower.includes('mono') || lower.includes('code') || lower.includes('source')) return 'mono'
  return 'body'
}

function mapSpacingKey(name, val) {
  const nameMap = {
    'xxs': '1', 'hair': '1', '2': '1',
    'xs': '2', '4': '2',
    'sm': '3', '8': '3',
    'md': '4', '12': '3', '16': '4',
    'base': '4',
    'lg': '6', '18': '5', '20': '5', '24': '6',
    'xl': '8', '30': '8', '32': '8',
    'xxl': '12', '40': '10', '48': '12',
    '64': '16', '96': '24',
  }
  return nameMap[name] || String(Math.round(val / 4))
}

function mapRadiusKey(name, val) {
  const nameMap = {
    'none': 'sm', 'xs': 'sm',
    'sm': 'md',
    'md': 'lg',
    'lg': 'xl',
    'xl': '2xl',
    'xxl': '2xl',
    'pill': 'full', 'full': 'full',
  }
  return nameMap[name] || 'md'
}

function validateToken(token, schemaPath) {
  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'))
  const errors = []

  if (!token.meta || !token.meta.name || !token.meta.version || !token.meta.theme) {
    errors.push('Missing required meta fields (name, version, theme)')
  }
  if (!token.colors || !token.colors.brand) {
    errors.push('Missing required colors.brand')
  }
  if (!token.colors || !token.colors.surface || !token.colors.surface.base) {
    errors.push('Missing required colors.surface.base')
  }
  if (!token.colors || !token.colors.ink || !token.colors.ink.default) {
    errors.push('Missing required colors.ink.default')
  }
  if (!token.typography || !token.typography.fontFamilies) {
    errors.push('Missing required typography.fontFamilies')
  }
  if (!token.typography || !token.typography.scales) {
    errors.push('Missing required typography.scales')
  }

  const brandKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
  if (token.colors?.brand) {
    brandKeys.forEach(k => {
      if (!token.colors.brand[k]) errors.push(`Missing colors.brand.${k}`)
      else if (!/^#[0-9A-Fa-f]{6}$/.test(token.colors.brand[k])) errors.push(`Invalid hex: colors.brand.${k} = ${token.colors.brand[k]}`)
    })
  }

  return errors
}

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
Usage: node generate-token.mjs <design-md-path> [--theme dark|light] [--name <brand-name>] [--output <path>]

Options:
  --theme   Theme mode (dark|light), auto-detected from surface.base luminance if not specified
  --name    Brand name for meta.name (default: derived from file path)
  --output  Output file path (default: stdout)

Examples:
  node generate-token.mjs ../references/brand-library/developer-tools/linear.app-DESIGN.md
  node generate-token.mjs ../references/brand-library/fintech/stripe-DESIGN.md --theme light
  node generate-token.mjs ./DESIGN.md --name my-brand --output ./token.json
`)
    process.exit(0)
  }

  const designPath = resolve(args[0])
  let theme = null
  let brandName = null
  let outputPath = null

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--theme' && args[i + 1]) { theme = args[++i] }
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
    const lum = getLuminance(baseColor)
    theme = lum < 0.3 ? 'dark' : 'light'
  }

  const token = mapToToken(design, brandName, theme, args[0])

  const schemaPath = resolve(ROOT, 'schema', 'design-token.schema.json')
  const errors = validateToken(token, schemaPath)
  if (errors.length > 0) {
    console.error('Validation errors:')
    errors.forEach(e => console.error(`  - ${e}`))
    process.exit(1)
  }

  const json = JSON.stringify(token, null, 2)

  if (outputPath) {
    writeFileSync(outputPath, json, 'utf-8')
    console.log(`Token generated: ${outputPath}`)
    console.log(`Brand: ${brandName}, Theme: ${theme}`)
  } else {
    console.log(json)
  }
}

main()
