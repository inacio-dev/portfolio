'use client'

import * as React from 'react'

import { Link as IntlLink } from '@/i18n/navigation'
import { trackEvent, type GtagEventParams, type PortifolioEventName } from '@/lib/analytics'

/**
 * `Link` localizado com tracking opt-in.
 *
 * Use este componente para **rotas internas tipadas** (`/sobre`,
 * `/projetos`). O wrapper é o `Link` do `next-intl/navigation`, que respeita
 * o locale ativo, faz prefetch e aplica os `pathnames` traduzidos.
 *
 * Para links **externos** (WhatsApp, GitHub, LinkedIn, mailto), use `<a>`
 * nativo — o `Link` do next-intl não foi pensado pra URLs absolutas.
 *
 * Tracking: passando `analyticsEvent`, dispara `trackEvent` antes do
 * `onClick` do caller.
 */

type IntlLinkProps = React.ComponentProps<typeof IntlLink>

export interface LinkProps extends Omit<IntlLinkProps, 'onClick'> {
  analyticsEvent?: PortifolioEventName
  analyticsParams?: GtagEventParams
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function Link({ analyticsEvent, analyticsParams, onClick, children, ...props }: LinkProps) {
  const handleClick = analyticsEvent
    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        trackEvent(analyticsEvent, analyticsParams)
        onClick?.(e)
      }
    : onClick

  return (
    <IntlLink {...props} onClick={handleClick}>
      {children}
    </IntlLink>
  )
}
