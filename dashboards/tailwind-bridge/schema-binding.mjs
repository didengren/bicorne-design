#!/usr/bin/env node
/**
 * schema-binding.mjs — Validate that token.json conforms to design-token.schema.json
 *                      before passing it to generate.mjs.
 *
 * Usage:
 *   node schema-binding.mjs --token ./token.json --schema ../../schema/design-token.schema.json
 *
 * Exits 0 if valid, 1 if not. Prints first 5 validation errors.
 *
 * Uses a tiny JSON-schema subset validator (no external deps) — supports
 * the design-token.schema.json's required fields and types.
 */

import fs from 'node:fs'
import path from 'node:path'

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {}
  for (let i = 0; i < args.length; i += 2) {
    opts[args[i].replace(/^--/, '')] = args[i + 1]
  }
  return opts
}

function validate(data, schema, path = '$') {
  const errors = []
  if (schema.type && typeof data !== schema.type) {
    if (!(schema.type === 'integer' && typeof data === 'number' && Number.isInteger(data))) {
      errors.push(`${path}: expected type ${schema.type}, got ${typeof data}`)
      return errors
    }
  }
  if (schema.required) {
    for (const r of schema.required) {
      if (!(r in data)) errors.push(`${path}: missing required field "${r}"`)
    }
  }
  if (schema.properties) {
    for (const [k, sub] of Object.entries(schema.properties)) {
      if (k in data) errors.push(...validate(data[k], sub, `${path}.${k}`))
    }
  }
  if (schema.items) {
    if (Array.isArray(data)) {
      data.forEach((item, i) => errors.push(...validate(item, schema.items, `${path}[${i}]`)))
    }
  }
  return errors
}

const opts = parseArgs()
const token = JSON.parse(fs.readFileSync(path.resolve(opts.token), 'utf-8'))
const schema = JSON.parse(fs.readFileSync(path.resolve(opts.schema), 'utf-8'))

const errors = validate(token, schema)
if (errors.length === 0) {
  console.log(`✓ ${opts.token} is valid.`)
  process.exit(0)
} else {
  console.error(`✗ ${opts.token} has ${errors.length} validation errors:`)
  errors.slice(0, 5).forEach(e => console.error('  ' + e))
  if (errors.length > 5) console.error(`  ... and ${errors.length - 5} more`)
  process.exit(1)
}
