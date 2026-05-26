import type { Metadata } from 'next'

import { getTranslations, setRequestLocale } from 'next-intl/server'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Terms' })
  return { title: t('title'), robots: { index: true, follow: true } }
}

const LAST_UPDATE = '2026-05-26'

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Terms')

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

        {([1, 2, 3, 4] as const).map((n) => (
          <section key={n} className="mt-8 first:mt-10">
            <h2 className="font-display text-xl font-semibold">{t(`section${n}Title`)}</h2>
            <p className="mt-2 text-muted-foreground">{t(`section${n}`)}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
