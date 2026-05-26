'use client'

import * as React from 'react'

import { trackEvent, type GtagEventParams, type PortifolioEventName } from '@/lib/analytics'

/**
 * `<a>` externo com tracking opt-in.
 *
 * Existe porque a maioria das páginas é Server Component e `onClick` só
 * funciona em Client Component. Esse wrapper é minimal — só adiciona um
 * boundary client em volta do `<a>` nativo, sem mudar a semântica.
 *
 * Use para links externos (WhatsApp, GitHub, LinkedIn, PDF de
 * certificado, etc) que precisam disparar evento no GTM. Para rotas
 * internas tipadas, continue usando `<Link>` de `@/components/Link`.
 *
 * @example
 * <TrackedExternalLink
 *   href={whatsappUrl()}
 *   target="_blank"
 *   rel="noopener noreferrer"
 *   event="whatsapp_opened"
 *   eventParams={{ source: 'home_hero' }}
 * >
 *   Falar comigo
 * </TrackedExternalLink>
 */
export interface TrackedExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: PortifolioEventName
  eventParams?: GtagEventParams
}

export function TrackedExternalLink({
  event,
  eventParams,
  onClick,
  children,
  ...props
}: TrackedExternalLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, eventParams)
    onClick?.(e)
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  )
}
