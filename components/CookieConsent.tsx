'use client'

import { useSyncExternalStore } from 'react'

import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'

/**
 * Banner de consentimento LGPD integrado com Google Consent Mode v2.
 *
 * Arquitetura
 * -----------
 * Este componente gerencia APENAS o banner + a escolha do usuário. O
 * carregamento do GTM e o sinal de consent DEFAULT ficam em
 * [app/[locale]/layout.tsx](../app/%5Blocale%5D/layout.tsx) — precisam rodar
 * beforeInteractive, antes do React hidratar.
 *
 * Fluxo (Consent Mode v2)
 * -----------------------
 * 1. 1ª visita → layout seta `gtag('consent', 'default', { ...all: 'denied' })`
 *    → GTM carrega → tags do Google respeitam o denied: enviam cookieless
 *    pings (modeling) mas NÃO setam cookies de tracking. O banner aparece.
 * 2. "Aceitar" → cookie `portifolio-cookie-consent=accepted` salvo →
 *    `gtag('consent', 'update', { ...all: 'granted' })` → tracking full.
 * 3. "Recusar" → cookie `portifolio-cookie-consent=rejected` salvo →
 *    nenhum update chamado (default já era denied). Tags continuam em modo
 *    cookieless.
 * 4. Visita futura com cookie === 'accepted' → layout já seta default GRANTED
 *    desde o boot → tags rodam full sem interação. Banner não aparece.
 *
 * Vantagem sobre bloquear o GTM condicionalmente: mesmo para usuários que
 * fecham a aba sem clicar, o Google consegue estimar volume e conversão via
 * behavioral modeling — ganho de ~30–50% de medição vs opt-in puro, sem
 * violar LGPD (nenhum cookie de tracking até consentimento explícito).
 *
 * Persistência via cookie first-party: compartilhável entre subdomínios,
 * expira em 180 dias (re-prompt semestral, padrão LGPD).
 *
 * Importante: este é um exemplo funcional mínimo. Para compliance estrito:
 * - Escolha granular (analytics / marketing / funcional)
 * - Audit trail server-side
 */

type ConsentState = 'pending' | 'accepted' | 'rejected'

const COOKIE_NAME = 'portifolio-cookie-consent'
const COOKIE_EXPIRES_DAYS = 180

const isProduction = process.env.NODE_ENV === 'production'
const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN

// Store externo: listeners in-memory + leitura direta do cookie.
// `document.cookie` não emite eventos quando muda no mesmo tab, então
// notificamos manualmente depois de cada escrita.
const listeners = new Set<() => void>()

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

function notifyListeners(): void {
  listeners.forEach((listener) => listener())
}

function getSnapshot(): ConsentState {
  const stored = Cookies.get(COOKIE_NAME)
  if (stored === 'accepted' || stored === 'rejected') return stored
  return 'pending'
}

/**
 * Anti-flicker: retorna `null` (não `'pending'`) no SSR pra que o banner
 * só seja inserido no DOM depois da hidratação ler o cookie real.
 * Usuário **novo** vê o banner com 1 frame de atraso — imperceptível e
 * melhor que flash.
 */
function getServerSnapshot(): ConsentState | null {
  return null
}

function setStoredConsent(value: 'accepted' | 'rejected'): void {
  Cookies.set(COOKIE_NAME, value, {
    expires: COOKIE_EXPIRES_DAYS,
    path: '/',
    sameSite: 'lax',
    secure: isProduction,
    ...(cookieDomain && { domain: cookieDomain }),
  })
  notifyListeners()
}

/**
 * Envia sinal de consent UPDATE para o gtag (Consent Mode v2). Só chamado
 * quando ACEITA — "Recusar" mantém o default (denied) que já foi setado
 * pelo script beforeInteractive no layout.
 */
function updateGtagConsent(granted: boolean): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  const state = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  })
}

export function CookieConsent() {
  const t = useTranslations('Cookie')

  const consent = useSyncExternalStore<ConsentState | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const handleAccept = () => {
    setStoredConsent('accepted')
    updateGtagConsent(true)
  }

  const handleReject = () => {
    setStoredConsent('rejected')
  }

  if (consent !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed right-4 bottom-4 left-4 z-50 max-w-md rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md sm:left-auto"
    >
      <h2 id="cookie-consent-title" className="text-sm font-semibold text-card-foreground">
        {t('title')}
      </h2>
      <p id="cookie-consent-description" className="mt-2 text-xs text-muted-foreground">
        {t('description')}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleReject}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:bg-muted"
        >
          {t('reject')}
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  )
}
