import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ===== 常量 =====
const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/
const SEMVER_PATTERN = /^\d+\.\d+\.\d+$/
const FONT_SIZE_PATTERN = /^\d+(\.\d+)?(px|rem|em)$/
const LETTER_SPACING_PATTERN = /^-?\d+(\.\d+)?px$/
const VALID_TEXT_TRANSFORMS = ['none', 'uppercase', 'lowercase', 'capitalize']
const BRAND_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const ROOT_REQUIRED = ['meta', 'colors', 'typography', 'spacing', 'borderRadius']
const ROOT_ALLOWED = ['meta', 'colors', 'typography', 'spacing', 'borderRadius', 'shadows', 'transitions']

// ===== 辅助函数 =====
function validateHex(path, value, errors) {
  if (value === undefined) return
  if (typeof value !== 'string' || !HEX_PATTERN.test(value)) {
    errors.push(`Invalid hex: ${path} = ${JSON.stringify(value)}`)
  }
}

function validateColorGroup(path, obj, requiredKeys, optionalKeys, errors) {
  if (!obj || typeof obj !== 'object') {
    // 如果该 group 本身是 colors.required，由调用方统一报 Missing
    // 此处只处理 group 存在但内部字段缺失的情况
    return
  }
  const allowed = [...requiredKeys, ...optionalKeys]
  for (const key of Object.keys(obj)) {
    if (!allowed.includes(key)) {
      errors.push(`Unexpected property: ${path}.${key}`)
    }
  }
  for (const key of requiredKeys) {
    if (obj[key] === undefined) {
      errors.push(`Missing: ${path}.${key}`)
    } else {
      validateHex(`${path}.${key}`, obj[key], errors)
    }
  }
  for (const key of optionalKeys) {
    if (obj[key] !== undefined) {
      validateHex(`${path}.${key}`, obj[key], errors)
    }
  }
}

// ===== 主校验函数 =====
function validateToken(tokenPath, schemaPath) {
  const token = JSON.parse(readFileSync(resolve(tokenPath), 'utf-8'))
  // 加载 schema 仅用于验证 schema 文件本身可读可解析
  // 实际校验逻辑手写实现，避免引入 ajv 依赖
  JSON.parse(readFileSync(resolve(schemaPath), 'utf-8'))

  const errors = []
  const warnings = []

  // --- 1. 顶层结构 ---
  for (const key of ROOT_REQUIRED) {
    if (token[key] === undefined) errors.push(`Missing: ${key}`)
  }
  for (const key of Object.keys(token)) {
    if (!ROOT_ALLOWED.includes(key)) {
      errors.push(`Unexpected root property: "${key}" (allowed: ${ROOT_ALLOWED.join(', ')})`)
    }
  }

  // --- 2. meta ---
  if (!token.meta) {
    // already reported
  } else {
    if (!token.meta.name) errors.push('Missing: meta.name')
    else if (typeof token.meta.name !== 'string') errors.push('Invalid: meta.name must be a string')
    if (!token.meta.version) errors.push('Missing: meta.version')
    else if (typeof token.meta.version !== 'string' || !SEMVER_PATTERN.test(token.meta.version)) {
      errors.push(`Invalid semver: meta.version = "${token.meta.version}", expected "X.Y.Z"`)
    }
    if (!token.meta.theme) errors.push('Missing: meta.theme')
    else if (!['dark', 'light'].includes(token.meta.theme)) {
      errors.push(`Invalid: meta.theme = "${token.meta.theme}", expected "dark" or "light"`)
    }
    if (token.meta.source === undefined) {
      warnings.push('Recommended: meta.source is missing')
    } else if (typeof token.meta.source !== 'string') {
      errors.push('Invalid: meta.source must be a string')
    }
    if (token.meta.description !== undefined && typeof token.meta.description !== 'string') {
      errors.push('Invalid: meta.description must be a string')
    }
    const metaAllowed = ['name', 'version', 'source', 'theme', 'description']
    for (const key of Object.keys(token.meta)) {
      if (!metaAllowed.includes(key)) {
        errors.push(`Unexpected property: meta.${key}`)
      }
    }
  }

  // --- 3. colors ---
  if (!token.colors) {
    // already reported
  } else {
    const colorsAllowed = ['brand', 'surface', 'ink', 'border', 'semantic']
    for (const key of Object.keys(token.colors)) {
      if (!colorsAllowed.includes(key)) {
        errors.push(`Unexpected property: colors.${key}`)
      }
    }

    // 3a. colors.brand — 10 级色阶
    if (!token.colors.brand) errors.push('Missing: colors.brand')
    else {
      for (const key of Object.keys(token.colors.brand)) {
        if (!BRAND_STEPS.includes(key)) {
          errors.push(`Unexpected property: colors.brand.${key} (allowed: ${BRAND_STEPS.join(', ')})`)
        }
      }
      for (const step of BRAND_STEPS) {
        if (token.colors.brand[step] === undefined) {
          errors.push(`Missing: colors.brand.${step}`)
        } else {
          validateHex(`colors.brand.${step}`, token.colors.brand[step], errors)
        }
      }
    }

    // Schema: colors.required = ["brand", "surface", "ink", "border"]
    // brand 已在上方 3a 校验，此处补检剩余 required groups
    for (const group of ['surface', 'ink', 'border']) {
      if (!token.colors[group]) {
        errors.push(`Missing: colors.${group}`)
      }
    }

    // 3b. colors.surface
    validateColorGroup('colors.surface', token.colors.surface, ['base'], ['1', '2', '3', '4'], errors)

    // 3c. colors.ink
    validateColorGroup('colors.ink', token.colors.ink, ['default'], ['muted', 'subtle', 'tertiary'], errors)

    // 3d. colors.border
    validateColorGroup('colors.border', token.colors.border, ['default'], ['strong', 'subtle'], errors)

    // 3e. colors.semantic (all optional)
    validateColorGroup('colors.semantic', token.colors.semantic, [], ['success', 'danger', 'warning', 'info'], errors)
    if (token.colors.semantic && Object.keys(token.colors.semantic).length === 0) {
      warnings.push('Recommended: colors.semantic is empty, consider adding status colors')
    }
  }

  // --- 4. typography ---
  if (!token.typography) {
    // already reported
  } else {
    const typoAllowed = ['fontFamilies', 'scales']
    for (const key of Object.keys(token.typography)) {
      if (!typoAllowed.includes(key)) {
        errors.push(`Unexpected property: typography.${key}`)
      }
    }

    // 4a. fontFamilies
    if (!token.typography.fontFamilies) errors.push('Missing: typography.fontFamilies')
    else if (Object.keys(token.typography.fontFamilies).length === 0) {
      warnings.push('Recommended: typography.fontFamilies is empty, at least one font family is expected')
    }
    if (token.typography.fontFamilies && Object.keys(token.typography.fontFamilies).length > 0) {
      for (const [key, family] of Object.entries(token.typography.fontFamilies)) {
        if (!/^[a-z][a-z0-9-]*$/.test(key)) {
          errors.push(`Invalid fontFamily key: "${key}" (must match ^[a-z][a-z0-9-]*$)`)
        }
        if (!family || typeof family !== 'object') {
          errors.push(`Invalid: typography.fontFamilies.${key} must be an object`)
        } else {
          if (!family.name) errors.push(`Missing: typography.fontFamilies.${key}.name`)
          else if (typeof family.name !== 'string') errors.push(`Invalid: typography.fontFamilies.${key}.name must be a string`)
          if (!family.stack) errors.push(`Missing: typography.fontFamilies.${key}.stack`)
          else if (typeof family.stack !== 'string') errors.push(`Invalid: typography.fontFamilies.${key}.stack must be a string`)
          const familyAllowed = ['name', 'stack']
          for (const prop of Object.keys(family)) {
            if (!familyAllowed.includes(prop)) {
              errors.push(`Unexpected property: typography.fontFamilies.${key}.${prop}`)
            }
          }
        }
      }
    }

    // 4b. scales
    if (!token.typography.scales) errors.push('Missing: typography.scales')
    else if (Object.keys(token.typography.scales).length === 0) {
      warnings.push('Recommended: typography.scales is empty, at least one scale is expected')
    }
    if (token.typography.scales && Object.keys(token.typography.scales).length > 0) {
      for (const [name, scale] of Object.entries(token.typography.scales)) {
        const path = `typography.scales.${name}`
        if (!/^[a-z][a-z0-9-]*$/.test(name)) {
          errors.push(`Invalid scale key: "${name}" (must match ^[a-z][a-z0-9-]*$)`)
        }
        if (!scale || typeof scale !== 'object') {
          errors.push(`Invalid: ${path} must be an object`)
          continue
        }

        // Required fields
        if (scale.fontSize === undefined) errors.push(`Missing: ${path}.fontSize`)
        else if (typeof scale.fontSize !== 'string' || !FONT_SIZE_PATTERN.test(scale.fontSize)) {
          errors.push(`Invalid fontSize: ${path}.fontSize = ${JSON.stringify(scale.fontSize)} (expected pattern: "Npx", "Nrem", "Nem")`)
        }

        if (scale.fontWeight === undefined) errors.push(`Missing: ${path}.fontWeight`)
        else if (!Number.isInteger(scale.fontWeight) || scale.fontWeight < 100 || scale.fontWeight > 900) {
          errors.push(`Invalid fontWeight: ${path}.fontWeight = ${JSON.stringify(scale.fontWeight)} (expected integer 100-900)`)
        }

        if (scale.lineHeight === undefined) errors.push(`Missing: ${path}.lineHeight`)
        else if (typeof scale.lineHeight !== 'number' || scale.lineHeight < 0.8) {
          errors.push(`Invalid lineHeight: ${path}.lineHeight = ${JSON.stringify(scale.lineHeight)} (expected number >= 0.8)`)
        }

        // Optional fields
        if (scale.letterSpacing !== undefined) {
          if (typeof scale.letterSpacing !== 'string' || !LETTER_SPACING_PATTERN.test(scale.letterSpacing)) {
            errors.push(`Invalid letterSpacing: ${path}.letterSpacing = ${JSON.stringify(scale.letterSpacing)} (expected pattern: "-Npx", "Npx")`)
          }
        }

        if (scale.textTransform !== undefined) {
          if (!VALID_TEXT_TRANSFORMS.includes(scale.textTransform)) {
            errors.push(`Invalid textTransform: ${path}.textTransform = ${JSON.stringify(scale.textTransform)} (expected: ${VALID_TEXT_TRANSFORMS.join('/')})`)
          }
        }

        if (scale.fontFamily !== undefined) {
          if (typeof scale.fontFamily !== 'string') {
            errors.push(`Invalid fontFamily: ${path}.fontFamily = ${JSON.stringify(scale.fontFamily)} (expected string reference to fontFamilies key)`)
          } else if (token.typography.fontFamilies && !token.typography.fontFamilies[scale.fontFamily]) {
            errors.push(`Broken reference: ${path}.fontFamily = "${scale.fontFamily}" not found in typography.fontFamilies`)
          }
        }

        // Additional properties check
        const scaleAllowed = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'fontFamily']
        for (const prop of Object.keys(scale)) {
          if (!scaleAllowed.includes(prop)) {
            errors.push(`Unexpected property: ${path}.${prop}`)
          }
        }
      }
    }
  }

  // --- 5. spacing ---
  if (!token.spacing) {
    // already reported
  } else if (Object.keys(token.spacing).length === 0) {
    warnings.push('Recommended: spacing is empty, at least one value is expected')
  } else {
    for (const [key, val] of Object.entries(token.spacing)) {
      if (!/^\d+$/.test(key)) {
        errors.push(`Invalid spacing key: "${key}" (must be numeric string like "1", "2", "4")`)
      }
      if (!Number.isInteger(val) || val < 0) {
        errors.push(`Invalid spacing value: spacing["${key}"] = ${JSON.stringify(val)} (expected non-negative integer)`)
      }
    }
  }

  // --- 6. borderRadius ---
  if (!token.borderRadius) {
    // already reported
  } else if (Object.keys(token.borderRadius).length === 0) {
    warnings.push('Recommended: borderRadius is empty, at least one value is expected')
  } else {
    for (const [key, val] of Object.entries(token.borderRadius)) {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(key)) {
        errors.push(`Invalid borderRadius key: "${key}" (must match ^[a-z0-9][a-z0-9-]*$)`)
      }
      if (!Number.isInteger(val) || val < 0) {
        errors.push(`Invalid borderRadius value: borderRadius["${key}"] = ${JSON.stringify(val)} (expected non-negative integer)`)
      }
    }
  }

  // --- 7. shadows (optional) ---
  if (token.shadows !== undefined) {
    for (const [key, shadow] of Object.entries(token.shadows)) {
      const path = `shadows.${key}`
      if (!/^[a-z][a-z0-9-]*$/.test(key)) {
        errors.push(`Invalid shadow key: "${key}"`)
      }
      if (!shadow || typeof shadow !== 'object') {
        errors.push(`Invalid: ${path} must be an object`)
      } else {
        if (shadow.value === undefined) errors.push(`Missing: ${path}.value`)
        else if (typeof shadow.value !== 'string') errors.push(`Invalid: ${path}.value must be a string`)
        const shadowAllowed = ['value']
        for (const prop of Object.keys(shadow)) {
          if (!shadowAllowed.includes(prop)) {
            errors.push(`Unexpected property: ${path}.${prop}`)
          }
        }
      }
    }
  }

  // --- 8. transitions (optional) ---
  if (token.transitions !== undefined) {
    for (const [key, transition] of Object.entries(token.transitions)) {
      const path = `transitions.${key}`
      if (!/^[a-z][a-z0-9-]*$/.test(key)) {
        errors.push(`Invalid transition key: "${key}"`)
      }
      if (!transition || typeof transition !== 'object') {
        errors.push(`Invalid: ${path} must be an object`)
      } else {
        if (transition.duration === undefined) errors.push(`Missing: ${path}.duration`)
        else if (typeof transition.duration !== 'string' || !/^\d+ms$/.test(transition.duration)) {
          errors.push(`Invalid duration: ${path}.duration = ${JSON.stringify(transition.duration)} (expected "Nms")`)
        }
        if (transition.easing === undefined) errors.push(`Missing: ${path}.easing`)
        else if (typeof transition.easing !== 'string') {
          errors.push(`Invalid easing: ${path}.easing must be a string`)
        }
        const transitionAllowed = ['duration', 'easing']
        for (const prop of Object.keys(transition)) {
          if (!transitionAllowed.includes(prop)) {
            errors.push(`Unexpected property: ${path}.${prop}`)
          }
        }
      }
    }
  }

  return { errors, warnings }
}

// ===== CLI 入口 =====
function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log(`
Usage: node validate-token.mjs <token.json-path> [schema-path]

Validates a token.json file against the design-token.schema.json.

Checks:
  - Required fields and additionalProperties (strict schema compliance)
  - Hex color format for all color values
  - Typography scale property formats (fontSize, fontWeight, lineHeight, letterSpacing)
  - Cross-reference: scales.fontFamily must exist in fontFamilies
  - shadows and transitions structure (if present)
  - meta.version semver format

Exit codes:
  0 — Valid (warnings may be printed)
  1 — Validation errors found
  2 — Fatal error (file not found, JSON parse error, etc.)

Examples:
  node validate-token.mjs references/token-mapping/examples/linear-dark.token.json
  node validate-token.mjs ./token.json schema/design-token.schema.json
`)
    process.exit(0)
  }

  const tokenPath = resolve(args[0])
  const schemaPath = args[1] ? resolve(args[1]) : resolve(ROOT, 'schema', 'design-token.schema.json')

  try {
    const { errors, warnings } = validateToken(tokenPath, schemaPath)

    if (warnings.length > 0) {
      console.log(`⚠️  Warnings (${warnings.length}):`)
      warnings.forEach(w => console.log(`  - ${w}`))
    }

    if (errors.length === 0) {
      console.log(`✅ ${tokenPath} — Valid`)
      process.exit(0)
    } else {
      console.log(`❌ ${tokenPath} — ${errors.length} error(s):`)
      errors.forEach(e => console.log(`  - ${e}`))
      process.exit(1)
    }
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(2)
  }
}

main()
