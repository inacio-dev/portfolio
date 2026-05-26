import type { Metadata } from 'next'

import { getTranslations, setRequestLocale } from 'next-intl/server'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  return { title: t('title'), robots: { index: true, follow: true } }
}

/**
 * Última atualização da política — string fixa em ISO. Atualize sempre
 * que o conteúdo mudar para que crawlers e usuários saibam que houve
 * revisão.
 */
const LAST_UPDATE = '2026-05-26'

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Privacy')

  const formattedDate = new Date(LAST_UPDATE).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          /{t('title').toLowerCase()}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          {t('lastUpdate')}: {formattedDate}
        </p>
      </header>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <p className="text-muted-foreground">{t('intro')}</p>

        <h2 className="mt-10 font-display text-xl font-semibold">{t('section1Title')}</h2>
        <p className="mt-2 text-muted-foreground">{t('section1')}</p>

        <h2 className="mt-8 font-display text-xl font-semibold">{t('section2Title')}</h2>
        <p className="mt-2 text-muted-foreground">{t('section2')}</p>

        <h2 className="mt-8 font-display text-xl font-semibold">{t('section3Title')}</h2>
        <p className="mt-2 text-muted-foreground">{t('section3')}</p>

        <h2 className="mt-8 font-display text-xl font-semibold">{t('section4Title')}</h2>
        <p className="mt-2 text-muted-foreground">{t('section4')}</p>

        <h2 className="mt-8 font-display text-xl font-semibold">{t('section5Title')}</h2>
        <p className="mt-2 text-muted-foreground">{t('section5')}</p>
      </div>
    </article>
  )
}
