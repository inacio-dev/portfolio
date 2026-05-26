import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

/**
 * Proxy middleware (Next 16 — renomeado de `middleware.ts`).
 *
 * Responsável por:
 * - Detectar o locale preferido do visitante via header `Accept-Language`
 * - Aplicar redirect para o locale prefixado quando necessário
 * - Reescrever os pathnames traduzidos (`/projects` ↔ `/projetos`)
 * - Emitir headers `Link: alternate hreflang` para SEO
 *
 * O `matcher` exclui `/api`, `/_next`, `/_vercel` e arquivos estáticos
 * (qualquer path com `.` — `.svg`, `.png`, `sitemap.xml`, etc).
 */
export default createMiddleware(routing)

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
