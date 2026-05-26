import type { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'

/**
 * next-intl: aponta para o módulo que retorna os messages do locale ativo.
 * O middleware (./middleware.ts) faz o roteamento por prefixo (/en, /es,
 * pt-BR default sem prefixo).
 */
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // Tipagem dos params dinâmicos do App Router via TypedRoutes
  typedRoutes: true,
}

export default withNextIntl(nextConfig)
