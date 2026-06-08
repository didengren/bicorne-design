import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import Ajv from 'ajv'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ===== 辅助函数 =====
function getValueByPath(obj, instancePath) {
  if (!instancePath || instancePath === '/') return obj
  const keys = instancePath.split('/').filter(Boolean)
  let current = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = current[key]
  }
  return current
}

function formatPath(instancePath) {
  if (!instancePath || instancePath === '/') return ''
  return instancePath.slice(1).replace(/\//g, '.')
}

// ===== AJV 校验 =====
function validateWithAjv(token, schema) {
  const ajv = new Ajv({ allErrors: true, strict: false })
  const validate = ajv.compile(schema)
  const valid = validate(token)

  const errors = []
  if (!valid && validate.errors) {
    for (const err of validate.errors) {
      const field = formatPath(err.instancePath)
      const value = getValueByPath(token, err.instancePath)
      const valueStr = JSON.stringify(value)

      if (err.keyword === 'required') {
        const missingProp = err.params.missingProperty
        errors.push(`Missing: ${field ? field + '.' : ''}${missingProp}`)
      } else if (err.keyword === 'additionalProperties') {
        const extraProp = err.params.additionalProperty
        errors.push(`Unexpected property: ${field ? field + '.' : ''}${extraProp}`)
      } else if (err.keyword === 'pattern') {
        errors.push(`Invalid format: ${field} = ${valueStr} (expected pattern: ${err.params.pattern})`)
      } else if (err.keyword === 'enum') {
        errors.push(`Invalid value: ${field} = ${valueStr} (allowed: ${err.params.allowedValues.join(', ')})`)
      } else if (err.keyword === 'type') {
        errors.push(`Invalid type: ${field} = ${valueStr} (expected ${err.params.type})`)
      } else if (err.keyword === 'minimum') {
        errors.push(`Invalid value: ${field} = ${valueStr} (minimum: ${err.params.minimum})`)
      } else if (err.keyword === 'maximum') {
        errors.push(`Invalid value: ${field} = ${valueStr} (maximum: ${err.params.maximum})`)
      } else {
        errors.push(`${err.keyword}: ${field || '(root)'} — ${err.message}`)
      }
    }
  }

  return errors
}

// ===== 跨引用校验（AJV 无法覆盖的逻辑） =====
function validateCrossReferences(token) {
  const errors = []

  if (token.typography?.scales && token.typography?.fontFamilies) {
    for (const [name, scale] of Object.entries(token.typography.scales)) {
      if (scale.fontFamily && !token.typography.fontFamilies[scale.fontFamily]) {
        errors.push(`Broken reference: typography.scales.${name}.fontFamily = "${scale.fontFamily}" not found in typography.fontFamilies`)
      }
    }
  }

  if (token.componentGrammar?.signatures) {
    const validArchetypes = new Set(['actionable', 'containment', 'navigation', 'indicator', 'display', 'data'])
    for (const [name, sig] of Object.entries(token.componentGrammar.signatures)) {
      if (sig.archetype && !validArchetypes.has(sig.archetype)) {
        errors.push(`Invalid archetype: componentGrammar.signatures.${name}.archetype = "${sig.archetype}" (expected one of: ${[...validArchetypes].join(', ')})`)
      }
      if (sig.states) {
        for (const [stateName, state] of Object.entries(sig.states)) {
          const allowedStateProps = new Set(['backgroundColor', 'textColor', 'border', 'boxShadow', 'opacity'])
          for (const prop of Object.keys(state)) {
            if (!allowedStateProps.has(prop)) {
              errors.push(`Unexpected property: componentGrammar.signatures.${name}.states.${stateName}.${prop} (allowed: ${[...allowedStateProps].join(', ')})`)
            }
          }
        }
      }
    }
  }

  if (token.layout) {
    if (token.layout.containerMaxWidth !== undefined && (typeof token.layout.containerMaxWidth !== 'number' || token.layout.containerMaxWidth < 320)) {
      errors.push(`Invalid value: layout.containerMaxWidth = ${token.layout.containerMaxWidth} (expected integer >= 320)`)
    }
    if (token.layout.navHeight !== undefined && (typeof token.layout.navHeight !== 'number' || token.layout.navHeight < 40)) {
      errors.push(`Invalid value: layout.navHeight = ${token.layout.navHeight} (expected integer >= 40)`)
    }
    if (token.layout.sectionSpacing !== undefined && (typeof token.layout.sectionSpacing !== 'number' || token.layout.sectionSpacing < 32)) {
      errors.push(`Invalid value: layout.sectionSpacing = ${token.layout.sectionSpacing} (expected integer >= 32)`)
    }
  }

  return errors
}

// ===== 推荐性警告 =====
function collectWarnings(token) {
  const warnings = []

  if (token.meta && token.meta.source === undefined) {
    warnings.push('Recommended: meta.source is missing')
  }

  if (token.colors?.semantic && Object.keys(token.colors.semantic).length === 0) {
    warnings.push('Recommended: colors.semantic is empty, consider adding status colors')
  }

  if (token.typography?.fontFamilies && Object.keys(token.typography.fontFamilies).length === 0) {
    warnings.push('Recommended: typography.fontFamilies is empty, at least one font family is expected')
  }

  if (token.typography?.scales && Object.keys(token.typography.scales).length === 0) {
    warnings.push('Recommended: typography.scales is empty, at least one scale is expected')
  }

  if (token.spacing && Object.keys(token.spacing).length === 0) {
    warnings.push('Recommended: spacing is empty, at least one value is expected')
  }

  if (token.borderRadius && Object.keys(token.borderRadius).length === 0) {
    warnings.push('Recommended: borderRadius is empty, at least one value is expected')
  }

  if (token.meta?.platform && token.meta.platform !== 'desktop' && !token.viewport) {
    warnings.push(`Recommended: viewport is missing for platform="${token.meta.platform}"`)
  }

  const validSpacingKeys = new Set(['1','2','3','4','5','6','8','10','12','16','24'])
  if (token.spacing) {
    for (const key of Object.keys(token.spacing)) {
      if (!validSpacingKeys.has(key)) {
        warnings.push(`Unexpected spacing key: "${key}" (expected one of: ${[...validSpacingKeys].join(', ')})`)
      }
    }
  }

  const validBorderRadiusKeys = new Set(['none','xs','sm','md','lg','xl','2xl','full'])
  if (token.borderRadius) {
    for (const key of Object.keys(token.borderRadius)) {
      if (!validBorderRadiusKeys.has(key)) {
        warnings.push(`Unexpected borderRadius key: "${key}" (expected one of: ${[...validBorderRadiusKeys].join(', ')})`)
      }
    }
  }

  const displayScales = new Set(['display-xl','display-lg','display-md'])
  if (token.typography?.scales) {
    for (const [name, scale] of Object.entries(token.typography.scales)) {
      if (typeof scale.lineHeight === 'number' && scale.lineHeight < 1.0 && !displayScales.has(name)) {
        warnings.push(`Recommended: typography.scales.${name}.lineHeight = ${scale.lineHeight} is below 1.0, which may be unreadable for non-display text`)
      }
    }
  }

  if (token.colors?.ink) {
    if (!token.colors.ink.muted) warnings.push('Recommended: colors.ink.muted is missing')
    if (!token.colors.ink.subtle) warnings.push('Recommended: colors.ink.subtle is missing')
    if (!token.colors.ink.tertiary) warnings.push('Recommended: colors.ink.tertiary is missing')
  }

  if (token.colors?.border) {
    if (!token.colors.border.strong) warnings.push('Recommended: colors.border.strong is missing')
    if (!token.colors.border.subtle) warnings.push('Recommended: colors.border.subtle is missing')
  }

  if (token.shadows && Object.keys(token.shadows).length === 0) {
    warnings.push('Recommended: shadows is empty, dark themes should define shadow levels')
  }

  if (token.transitions && Object.keys(token.transitions).length === 0) {
    warnings.push('Recommended: transitions is empty, define at least a default transition')
  }

  const requiredScales = ['body-md', 'body-sm', 'caption', 'button']
  if (token.typography?.scales) {
    for (const required of requiredScales) {
      if (!token.typography.scales[required]) {
        warnings.push(`Recommended: typography.scales.${required} is missing`)
      }
    }
  }

  if (token.componentGrammar?.signatures && Object.keys(token.componentGrammar.signatures).length === 0) {
    warnings.push('Recommended: componentGrammar.signatures is empty, consider adding component signatures')
  }

  if (!token.componentGrammar) {
    warnings.push('Recommended: componentGrammar is missing, component specifications help consumers build consistent UI')
  }

  if (!token.layout) {
    warnings.push('Recommended: layout is missing, layout constants help consumers set correct container dimensions')
  }

  if (token.layout) {
    if (!token.layout.containerMaxWidth) warnings.push('Recommended: layout.containerMaxWidth is missing')
    if (!token.layout.navHeight) warnings.push('Recommended: layout.navHeight is missing')
    if (!token.layout.sectionSpacing) warnings.push('Recommended: layout.sectionSpacing is missing')
  }

  return warnings
}

// ===== 主校验函数（对象版本，供其他模块导入） =====
export function validateTokenObject(token, schema) {
  const schemaErrors = validateWithAjv(token, schema)
  const crossRefErrors = validateCrossReferences(token)
  const warnings = collectWarnings(token)
  const errors = [...schemaErrors, ...crossRefErrors]
  return { errors, warnings }
}

// ===== 主校验函数（文件版本，CLI 使用） =====
function validateToken(tokenPath, schemaPath) {
  const token = JSON.parse(readFileSync(resolve(tokenPath), 'utf-8'))
  const schema = JSON.parse(readFileSync(resolve(schemaPath), 'utf-8'))

  const schemaErrors = validateWithAjv(token, schema)
  const crossRefErrors = validateCrossReferences(token)
  const warnings = collectWarnings(token)

  const errors = [...schemaErrors, ...crossRefErrors]

  return { errors, warnings }
}

// ===== CLI 入口 =====
function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log(`
Usage: node validate-token.mjs <token.json-path> [schema-path]

Validates a token.json file against the design-token.schema.json using AJV.

Checks:
  - JSON Schema compliance (structure, types, patterns, enums)
  - additionalProperties enforcement (strict schema compliance)
  - Cross-reference: scales.fontFamily must exist in fontFamilies
  - Recommended field warnings

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

const __filename = fileURLToPath(import.meta.url)
const isMain = process.argv[1] && resolve(process.argv[1]) === __filename
if (isMain) {
  main()
}
