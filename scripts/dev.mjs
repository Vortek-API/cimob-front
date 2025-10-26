// scripts/dev.mjs

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

// --- CORREÇÃO DO ERRO EINVAL ---
// A opção `shell: true` é adicionada para garantir que o executável 'nuxt'
// seja encontrado pelo shell do sistema, resolvendo o problema de execução.

const command = process.platform === 'win32' ? 'nuxt.cmd' : 'nuxt'
const args = ['dev', ...passThrough]

const child = spawn(command, args, {
  stdio: 'inherit',
  env,
  shell: true // Adicionado para garantir que o executável seja encontrado
})

child.on('exit', (code) => process.exit(code ?? 0))
