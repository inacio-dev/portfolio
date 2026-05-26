'use client'

import * as React from 'react'
import Script from 'next/script'

/**
 * Widget Cloudflare Turnstile invisible.
 *
 * Renderiza o widget via API JS oficial — não usa o atributo `data-callback`
 * porque queremos chamar o `onToken` no callback do componente React.
 *
 * O token gerado é enviado pelo form como `cf-turnstile-response` (nome
 * padrão do Turnstile, mesma chave esperada pela server action).
 *
 * Sem `NEXT_PUBLIC_TURNSTILE_SITE_KEY` o widget renderiza um placeholder
 * inerte — server action também aceita submission sem challenge nesse caso.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          size?: 'normal' | 'compact' | 'invisible' | 'flexible'
          theme?: 'light' | 'dark' | 'auto'
        },
      ) => string
      remove: (widgetId: string) => void
      reset: (widgetId?: string) => void
    }
  }
}

interface TurnstileProps {
  onToken?: (token: string) => void
  theme?: 'light' | 'dark' | 'auto'
}

export function Turnstile({ onToken, theme = 'auto' }: TurnstileProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const widgetIdRef = React.useRef<string | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const renderWidget = React.useCallback(() => {
    if (!siteKey) return
    if (!window.turnstile) return
    if (!containerRef.current) return
    if (widgetIdRef.current) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      size: 'flexible',
      callback: (token) => onToken?.(token),
      'expired-callback': () => onToken?.(''),
      'error-callback': () => onToken?.(''),
    })
  }, [onToken, siteKey, theme])

  React.useEffect(() => {
    renderWidget()
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget])

  if (!siteKey) {
    return (
      <p className="font-mono text-xs text-muted-foreground">
        [dev] Turnstile desabilitado — setar{' '}
        <span className="inline-mono">NEXT_PUBLIC_TURNSTILE_SITE_KEY</span> para ativar.
      </p>
    )
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={renderWidget}
      />
      <div ref={containerRef} />
    </>
  )
}
