import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

/**
 * Setup global do Vitest.
 *
 * - Importa os matchers do `jest-dom` (`toBeInTheDocument`, etc.)
 * - Roda `cleanup()` após cada teste — desmonta tudo do DOM e zera o
 *   estado dos componentes. RTL já faz isso automaticamente quando o
 *   modo `globals` está ligado, mas chamamos explicitamente como
 *   defesa em profundidade contra leak entre testes.
 */
afterEach(() => {
  cleanup()
})
