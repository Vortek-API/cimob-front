#!/usr/bin/env node
import { spawn } from 'node:child_process'

// Parse args (supports: `auth`, `--auth`, `--no-auth`)
const rawArgs = process.argv.slice(2)
let bypass
const passThrough = []

for (const a of rawArgs) {
  if (a === 'auth' || a === '--auth') bypass = true
  else if (a === '--no-auth') bypass = false
  else passThrough.push(a)
}

// Prepare env, only override when user specified
const env = { ...process.env }
if (bypass === true) env.NUXT_AUTH_BYPASS = '1'
if (bypass === false) env.NUXT_AUTH_BYPASS = '0'

// Run `nuxt dev` passing through any extra CLI args
const child = spawn(process.platform === 'win32' ? 'nuxt.cmd' : 'nuxt', ['dev', ...passThrough], {
  stdio: 'inherit',
  env
})

child.on('exit', (code) => process.exit(code ?? 0))
