import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/site'

/**
 * `/sitemap.xml` gerado automaticamente em build/runtime.
 *
 * Estratégia multi-locale
 * -----------------------
 * Para cada rota pública, emitimos uma entrada por locale com
 * `alternates.languages` — assim o Google sabe que `/projetos`,
 * `/en/projects` e `/es/proyectos` são variantes da mesma página em
 * idiomas diferentes (hreflang).
 *
 * Os segmentos traduzidos vêm de `routing.pathnames` — mantém a fonte de
 * verdade em um lugar só.
 */

// Rotas canônicas (em pt-BR). Para descobrir o segmento real em cada
// locale, consultamos `routing.pathnames[canonical][locale]`.
const ROUTES: {
  canonical: keyof typeof routing.pathnames
  priority: number
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
}[] = [
  { canonical: '/', priority: 1, changeFrequency: 'weekly' },
  { canonical: '/sobre', priority: 0.9, changeFrequency: 'monthly' },
  { canonical: '/projetos', priority: 0.95, changeFrequency: 'monthly' },
  { canonical: '/experiencia', priority: 0.8, changeFrequency: 'monthly' },
  { canonical: '/certificados', priority: 0.7, changeFrequency: 'monthly' },
  { canonical: '/contato', priority: 0.85, changeFrequency: 'yearly' },
  { canonical: '/privacidade', priority: 0.3, changeFrequency: 'yearly' },
  { canonical: '/termos', priority: 0.3, changeFrequency: 'yearly' },
]

function resolvePath(
  canonical: keyof typeof routing.pathnames,
  locale: (typeof routing.locales)[number],
): string {
  const mapping = routing.pathnames[canonical]
  if (typeof mapping === 'string') return mapping
  return mapping[locale] ?? canonical
}

function urlFor(
  canonical: keyof typeof routing.pathnames,
  locale: (typeof routing.locales)[number],
): string {
  const segment = resolvePath(canonical, locale)
  const isHome = segment === '/'
  if (locale === routing.defaultLocale) {
    return `${SITE_URL}${isHome ? '' : segment}` || `${SITE_URL}/`
  }
  return `${SITE_URL}/${locale}${isHome ? '' : segment}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROUTES.flatMap(({ canonical, priority, changeFrequency }) => {
    return routing.locales.map((locale) => {
      const languages: Record<string, string> = {}
      for (const l of routing.locales) {
        languages[l] = urlFor(canonical, l)
      }
      languages['x-default'] = urlFor(canonical, routing.defaultLocale)

      return {
        url: urlFor(canonical, locale),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      }
    })
  })
}
