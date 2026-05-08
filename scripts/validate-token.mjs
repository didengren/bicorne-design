import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

function validateToken(tokenPath, schemaPath) {
  const token = JSON.parse(readFileSync(resolve(tokenPath), 'utf-8'))
  const schema = JSON.parse(readFileSync(resolve(schemaPath), 'utf-8'))

  const errors = []

  if (!token.meta) errors.push('Missing: meta')
  else {
    if (!token.meta.name) errors.push('Missing: meta.name')
    if (!token.meta.version) errors.push('Missing: meta.version')
    if (!token.meta.theme) errors.push('Missing: meta.theme')
    if (token.meta.theme && !['dark', 'light'].includes(token.meta.theme)) errors.push(`Invalid: meta.theme = "${token.meta.theme}", expected "dark" or "light"`)
  }

  if (!token.colors) errors.push('Missing: colors')
  else {
    if (!token.colors.brand) errors.push('Missing: colors.brand')
    else {
      const requiredSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      requiredSteps.forEach(step => {
        if (!token.colors.brand[step]) errors.push(`Missing: colors.brand.${step}`)
        else if (!/^#[0-9A-Fa-f]{6}$/.test(token.colors.brand[step])) errors.push(`Invalid hex: colors.brand.${step} = "${token.colors.brand[step]}"`)
      })
    }

    if (!token.colors.surface) errors.push('Missing: colors.surface')
    else if (!token.colors.surface.base) errors.push('Missing: colors.surface.base')
    else if (!/^#[0-9A-Fa-f]{6}$/.test(token.colors.surface.base)) errors.push(`Invalid hex: colors.surface.base`)

    if (!token.colors.ink) errors.push('Missing: colors.ink')
    else if (!token.colors.ink.default) errors.push('Missing: colors.ink.default')

    if (!token.colors.border) errors.push('Missing: colors.border')
    else if (!token.colors.border.default) errors.push('Missing: colors.border.default')
  }

  if (!token.typography) errors.push('Missing: typography')
  else {
    if (!token.typography.fontFamilies) errors.push('Missing: typography.fontFamilies')
    if (!token.typography.scales) errors.push('Missing: typography.scales')
    else {
      for (const [name, scale] of Object.entries(token.typography.scales)) {
        if (!scale.fontSize) errors.push(`Missing: typography.scales.${name}.fontSize`)
        if (!scale.fontWeight) errors.push(`Missing: typography.scales.${name}.fontWeight`)
        if (!scale.lineHeight) errors.push(`Missing: typography.scales.${name}.lineHeight`)
      }
    }
  }

  if (!token.spacing) errors.push('Missing: spacing')
  if (!token.borderRadius) errors.push('Missing: borderRadius')

  return errors
}

function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log(`
Usage: node validate-token.mjs <token.json-path> [schema-path]

Validates a token.json file against the design-token.schema.json.

Examples:
  node validate-token.mjs references/token-mapping/examples/linear-dark.token.json
  node validate-token.mjs ./token.json schema/design-token.schema.json
`)
    process.exit(0)
  }

  const tokenPath = resolve(args[0])
  const schemaPath = args[1] ? resolve(args[1]) : resolve(ROOT, 'schema', 'design-token.schema.json')

  try {
    const errors = validateToken(tokenPath, schemaPath)
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
    process.exit(1)
  }
}

main()
