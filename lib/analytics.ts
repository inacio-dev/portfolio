/**
 * Camada central de tracking para GTM → GA4 (e qualquer outra tag configurada
 * no GTM).
 *
 * Por que centralizar aqui em vez de chamar `window.gtag(...)` direto nos
 * componentes:
 *
 * - Único ponto pra grep — `rg "trackEvent"` mostra todo o tracking do site
 * - SSR-safe — guards de `typeof window` embutidos
 * - Dev logging — cada evento aparece no console em dev
 * - Trivial de mockar em testes
 * - Single point to swap provider — se sair do GTM, só este arquivo muda
 *
 * Prefixo `portifolio_` automático
 * --------------------------------
 * Todos os eventos disparados por `trackEvent` são prefixados com
 * `portifolio_` antes de chegarem no GTM. Isso permite que a tag GA4 do GTM
 * filtre com regex `^portifolio_`, encaminhando apenas os eventos da
 * aplicação e ignorando:
 *
 * - Eventos automáticos do GTM (`gtm.js`, `gtm.dom`, `gtm.load`, `gtm.init`)
 * - Eventos do Enhanced Measurement do GA4 (`scroll`, `click`, `page_view`,
 *   `first_visit`, `session_start`) — esses o GA4 já dispara nativamente
 *
 * `trackEvent('cta_clicked')` vira internamente `gtag('event',
 * 'portifolio_cta_clicked', ...)`.
 *
 * O `dataLayer` + função `gtag` são definidos pelo script `beforeInteractive`
 * no layout do app (Consent Mode v2). Em produção, gtag existe antes de
 * qualquer interação disparar tracking.
 *
 * Não precisa checar consent aqui — o GTM respeita os sinais de consent
 * automaticamente. Se o usuário não aceitou, o evento ainda vai pro
 * dataLayer, mas o GTM não propaga com cookies; GA4 trata como cookieless
 * ping para behavioral modeling.
 */

export type GtagEventParams = Record<string, string | number | boolean | undefined | null>

/**
 * Catálogo de eventos que o portfólio dispara. Fonte única de verdade:
 * adicionar um nome aqui libera o uso nos componentes `<Button>` e `<Link>`
 * via prop `analyticsEvent` e em chamadas diretas a `trackEvent`.
 *
 * Convenção: `snake_case`, começa com verbo no passado ou identifica o
 * recurso interagido. Não inclua o prefixo `portifolio_` — é adicionado
 * automaticamente pelo `trackEvent`.
 */
export type PortifolioEventName =
  // CTAs e navegação
  | 'cta_clicked'
  | 'project_clicked'
  | 'github_repo_clicked'
  // Canais de contato
  | 'whatsapp_opened'
  | 'email_clicked'
  | 'linkedin_clicked'
  | 'github_clicked'
  // Conteúdo
  | 'certificate_opened'
  | 'cv_downloaded'
  | 'language_changed'
  | 'theme_changed'
  // Formulário
  | 'contact_form_submitted'

export const EVENT_PREFIX = 'portifolio_'

type GtagFn = (
  command: 'event' | 'config' | 'consent',
  targetOrEventName: string,
  params?: GtagEventParams,
) => void

/**
 * `window.dataLayer` é declarado pelo `@next/third-parties` — não
 * redeclaramos aqui (TypeScript exige modificadores idênticos no merge
 * de interfaces). Só adicionamos `gtag`, que o pacote não tipa.
 */
declare global {
  interface Window {
    gtag: GtagFn
  }
}

/**
 * Dispara um evento para o GTM/GA4 com o prefixo `portifolio_` aplicado.
 *
 * Defensivo — não lança nunca, mesmo se o `gtag` ainda não tiver carregado.
 * Isso evita que um erro de analytics quebre uma navegação do usuário.
 */
export function trackEvent(name: PortifolioEventName, params?: GtagEventParams): void {
  if (typeof window === 'undefined') return

  const fullName = `${EVENT_PREFIX}${name}`

  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', fullName, params ?? {})
  }

  try {
    window.gtag?.('event', fullName, params)
  } catch {
    // Silencioso de propósito — tracking nunca deve quebrar a UI.
  }
}
