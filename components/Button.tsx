'use client'

import * as React from 'react'

import { Button as ShadcnButton } from '@/components/ui/button'
import { trackEvent, type GtagEventParams, type PortifolioEventName } from '@/lib/analytics'

/**
 * Wrapper fino do `Button` do shadcn/ui com tracking opt-in.
 *
 * - Sem `analyticsEvent`: renderiza igual ao shadcn, zero overhead.
 * - Com `analyticsEvent`: dispara `trackEvent` ANTES do `onClick` original.
 *   Se o tracking falhar (já é defensivo), não interrompe o clique.
 *
 * @example
 * <Button asChild analyticsEvent="whatsapp_opened" analyticsParams={{ source: 'hero' }}>
 *   <a href={WHATSAPP_URL}>Falar no WhatsApp</a>
 * </Button>
 */
export interface ButtonProps extends React.ComponentProps<typeof ShadcnButton> {
  /** Nome do evento a disparar no click. Omitir desliga o tracking deste botão. */
  analyticsEvent?: PortifolioEventName
  /** Parâmetros opcionais do evento (source, slug, etc.). */
  analyticsParams?: GtagEventParams
}

export function Button({ analyticsEvent, analyticsParams, onClick, ...props }: ButtonProps) {
  const handleClick = analyticsEvent
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        trackEvent(analyticsEvent, analyticsParams)
        onClick?.(e)
      }
    : onClick

  return <ShadcnButton {...props} onClick={handleClick} />
}
