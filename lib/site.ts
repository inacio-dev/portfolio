/**
 * Constantes públicas do site lidas das envs.
 *
 * Centraliza:
 * - SITE_URL (canonical, sitemap, robots, OG)
 * - CONTACT (email, WhatsApp, GitHub, LinkedIn)
 *
 * Em CI sem secrets, o build não pode quebrar — emitimos warning e usamos
 * fallback fictício. Em produção, o host (Vercel/Coolify) deve sempre
 * injetar as envs reais.
 */

const FALLBACK_SITE_URL = 'https://inaciorodrigues.dev.br'

export const SITE_URL = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL
  if (!raw) {
    if (typeof window === 'undefined') {
      console.warn(
        '[site] NEXT_PUBLIC_SITE_URL não definida — usando fallback ' +
          `"${FALLBACK_SITE_URL}". Configure no host antes do deploy.`,
      )
    }
    return FALLBACK_SITE_URL
  }
  return raw.replace(/\/$/, '')
})()

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'inaciormgalvao@outlook.com'
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5585998277174'
export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/inacio-dev'
export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/inacio-rodrigues-dev/'

/**
 * URL pública do repositório do portfólio — exibida na home como CTA
 * "veja o código deste site".
 */
export const PORTFOLIO_REPO_URL = `${GITHUB_URL}/portfolio`

/**
 * URLs públicas das instituições/empresas mencionadas na timeline.
 * Centralizadas para reuso entre páginas e fácil atualização.
 */
export const EXTERNAL_URLS = {
  beq: 'https://beq.com.br/',
  neuroarq: 'https://www.neuroarqtools.com/br/login',
  ufc: 'https://www.ufc.br/',
} as const

/**
 * Constrói uma URL de WhatsApp pré-preenchida com mensagem opcional.
 *
 * @example
 * whatsappUrl()                     // wa.me/55...
 * whatsappUrl('Olá, vi seu site')   // wa.me/55...?text=...
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * `mailto:` com subject/body opcionais.
 */
export function mailtoUrl(options?: { subject?: string; body?: string }): string {
  const params = new URLSearchParams()
  if (options?.subject) params.set('subject', options.subject)
  if (options?.body) params.set('body', options.body)
  const qs = params.toString()
  return qs ? `mailto:${CONTACT_EMAIL}?${qs}` : `mailto:${CONTACT_EMAIL}`
}
