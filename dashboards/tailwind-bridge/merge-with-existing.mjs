#!/usr/bin/env node
/**
 * merge-with-existing.mjs — Merge generated Tailwind config with host project's existing config.
 *
 * Use when the host project already has a tailwind.config.ts with custom content paths,
 * plugins, presets, etc. that you don't want to lose.
 *
 * Usage:
 *   node merge-with-existing.mjs --generated ./tailwind.config.generated.ts \
 *                               --existing ./tailwind.config.ts \
 *                               --out ./tailwind.config.merged.ts
 *
 * Strategy: keep the existing file's `content`, `plugins`, `presets`; replace `theme.extend`
 * with the generated version.
 */

import fs from 'node:fs'
import path from 'node:path'

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = {}
  for (let i = 0; i < args.length; i += 2) {
    const k = args[i].replace(/^--/, '')
    opts[k] = args[i + 1]
  }
  return opts
}

function extractExtend(src) {
  // Find the `theme: { extend: { ... } }` block
  const match = src.match(/extend:\s*\{[\s\S]*?^\s*\}/m)
  if (!match) return null
  return match[0]
}

function extractField(src, field) {
  const re = new RegExp(`${field}:\\s*\\[[\\s\\S]*?\\]|${field}:\\s*\\{[\\s\\S]*?\\}`, 'm')
  const m = src.match(re)
  return m ? m[0] : null
}

const opts = parseArgs()
if (!opts.generated || !opts.existing || !opts.out) {
  console.error('Usage: merge-with-existing.mjs --generated <path> --existing <path> --out <path>')
  process.exit(1)
}

const generated = fs.readFileSync(path.resolve(opts.generated), 'utf-8')
const existing = fs.readFileSync(path.resolve(opts.existing), 'utf-8')

const generatedExtend = extractExtend(generated)
const content = extractField(existing, 'content')
const plugins = extractField(existing, 'plugins')

if (!generatedExtend) {
  console.error('Generated config has no theme.extend — cannot merge.')
  process.exit(1)
}

const merged = `import type { Config } from 'tailwindcss'

/**
 * MERGED by bicorne-design/tailwind-bridge/merge-with-existing.mjs
 * - content, plugins from: ${opts.existing}
 * - theme.extend from:     ${opts.generated}
 */
export default {
  content: ${content || "['./index.html', './src/**/*.{vue,ts,tsx}']"},
  ${plugins ? `plugins: ${plugins},` : ''}
  theme: {
    ${generatedExtend},
  },
} satisfies Config
`

fs.writeFileSync(path.resolve(opts.out), merged, 'utf-8')
console.log(`✓ Merged → ${opts.out}`)
