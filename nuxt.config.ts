// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'fs'
import { resolve } from 'path'

function readEnv(): Record<string, string> {
  try {
    return Object.fromEntries(
      readFileSync(resolve(process.cwd(), '.env'), 'utf-8')
        .split('\n')
        .flatMap(line => {
          const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/)
          return m ? [[m[1], m[2].trim()]] : []
        })
    )
  } catch { return {} }
}

const env     = readEnv()
const colorP  = env.NUXT_PUBLIC_COLOR_P  || '#FF6B2B'
const colorP2 = env.NUXT_PUBLIC_COLOR_P2 || '#FF9A5C'

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-05-19',
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'trancn – Backend Developer',
      style: [
        { innerHTML: `:root{--p:${colorP};--p2:${colorP2};}` },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
        },
      ],
    },
  },
})
