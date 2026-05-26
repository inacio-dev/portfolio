import type { Metadata } from 'next'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About' })
  return { title: t('title') }
}

const FOCUS_AREAS = [
  'Full Stack Development',
  'DevOps & Kubernetes',
  'Distributed Systems',
  'Embedded Systems & IoT',
  'Real-time Communication',
  'Software Architecture',
] as const

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('About')

  return (
    <article className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          /{t('title').toLowerCase()}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl font-semibold">{t('summaryTitle')}</h2>
            <p className="mt-3 text-muted-foreground">{t('summary')}</p>
            <p className="mt-3 text-muted-foreground">{t('summarySecondary')}</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">{t('objectivesTitle')}</h2>
            <p className="mt-3 text-muted-foreground">{t('objectives')}</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">{t('skillsTitle')}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {FOCUS_AREAS.map((area) => (
                <Badge key={area} variant="outline" className="font-mono text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base">{t('languagesTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{t('languagePtNative')}</p>
              <p>{t('languageEnAdvanced')}</p>
              <p>{t('languageEsBasic')}</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
  )
}
