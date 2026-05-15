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

  return warnings
}

// ===== 主校验函数 =====
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

main()
