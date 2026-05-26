import { Bricolage_Grotesque, IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'

import { CookieConsent } from '@/components/CookieConsent'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/site'

import { Providers } from '../providers'

/**
 * Tipografia:
 * - Bricolage Grotesque (display variável) — headlines e números hero
 * - Plus Jakarta Sans — body, leitura longa
 * - IBM Plex Mono — código, paths, valores técnicos
 */
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  axes: ['wdth', 'opsz'],
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

/**
 * Consent Mode v2 — define defaults antes do GTM carregar. Lê o cookie
 * `portifolio-cookie-consent` que o `<CookieConsent>` grava quando o
 * usuário decide. Se não há cookie, default = denied (LGPD-safe).
 *
 * Inline script (não `next/script` strategy=beforeInteractive porque
 * essa estratégia só funciona no root layout). `<script>` síncrono
 * renderizado pelo server executa no parse do HTML, antes de qualquer
 * script assíncrono — incluindo o do GTM.
 */
const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() { window.dataLayer.push(arguments); };
(function () {
  var match = document.cookie.match(/(?:^|; )portifolio-cookie-consent=([^;]+)/);
  var accepted = match && match[1] === 'accepted';
  window.gtag('consent', 'default', {
    analytics_storage: accepted ? 'granted' : 'denied',
    ad_storage: accepted ? 'granted' : 'denied',
    ad_user_data: accepted ? 'granted' : 'denied',
    ad_personalization: accepted ? 'granted' : 'denied',
    wait_for_update: 500
  });
})();
`

/**
 * Geração estática de cada locale — Next pré-renderiza /, /en, /es no
 * build, sem necessidade de runtime. `dynamicParams = false` recusa
 * locales fora da lista (404 imediato).
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const dynamicParams = false

/**
 * Mapping de locale → BCP47 para tags `lang` e `og:locale`.
 */
const OG_LOCALES: Record<(typeof routing.locales)[number], string> = {
  'pt-BR': 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}

  const t = await getTranslations({ locale, namespace: 'Meta' })

  // Hreflang alternates — para cada locale, mapeia / → /, /en → /en, etc.
  // `x-default` aponta para o pt-BR sem prefixo.
  const languages: Record<string, string> = {
    'x-default': '/',
  }
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? '/' : `/${l}`
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('defaultTitle'),
      template: t('titleTemplate'),
    },
    description: t('defaultDescription'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'Inácio Rodrigues', url: SITE_URL }],
    creator: 'Inácio Rodrigues',
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages,
    },
    openGraph: {
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      url: locale === routing.defaultLocale ? '/' : `/${locale}`,
      siteName: t('siteName'),
      type: 'website',
      locale: OG_LOCALES[locale as (typeof routing.locales)[number]],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * Root layout do segmento [locale]. Renderiza `<html>` e `<body>` com o
 * `lang` correto — acessibilidade e SEO. O `app/layout.tsx` no nível
 * acima é apenas passthrough (Next exige sua existência mas html/body
 * vivem aqui para conhecer o locale).
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Habilita renderização estática deste segmento — sem isso, qualquer
  // uso de `useTranslations` força a árvore para dinâmico.
  setRequestLocale(locale)

  const messages = await getMessages()
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${jakarta.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
        />
        {gtmId && <GoogleTagManager gtmId={gtmId} />}

        <Providers messages={messages} locale={locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </Providers>

        {/* Vercel Web Analytics — sem cookies, sem PII, LGPD-friendly.
            Convive com o GTM/GA4 (consent mode) — não exige opt-in extra.
            Em dev local fica em modo "debug" e não envia dados pra Vercel. */}
        <Analytics />
      </body>
    </html>
  )
}
