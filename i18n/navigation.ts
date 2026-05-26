import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

/**
 * Wrappers de navegação localizados.
 *
 * Use `Link` em vez do `next/link` quando precisar gerar URLs que
 * respeitem o locale ativo e os pathnames traduzidos (`/projetos` ↔
 * `/projects`). Os helpers `redirect`, `usePathname` e `useRouter`
 * fazem o mesmo trabalho para fluxos client/server.
 *
 * Para links *externos* (WhatsApp, GitHub, LinkedIn) continue usando
 * `<a href>` ou o `next/link` original — esse aqui é só para rotas
 * internas tipadas.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
