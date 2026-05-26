import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

/**
 * Vitest config do portfólio.
 *
 * - `jsdom` para testes que tocam DOM (React Testing Library)
 * - Alias `@/*` para casar com o `paths` do tsconfig
 * - Setup global em `vitest.setup.ts` (matchers do `@testing-library/jest-dom`)
 *
 * Roda só arquivos `*.test.ts` / `*.test.tsx` — convenção do projeto é
 * colocar o teste **ao lado** do arquivo que ele testa.
 */
const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'dist'],
    css: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, '.'),
    },
  },
})
