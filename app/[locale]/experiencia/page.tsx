import type { Metadata } from 'next'

import { Building2, GraduationCap } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Experience' })
  return { title: t('title') }
}

type WorkKey = 'beqSr' | 'beqJr' | 'neuroarq'
type EducationKey = 'ufc' | 'ensinoMedio'

const WORK: readonly { key: WorkKey; current?: boolean }[] = [
  { key: 'beqSr', current: true },
  { key: 'neuroarq', current: true },
  { key: 'beqJr' },
] as const

const EDUCATION: readonly { key: EducationKey; current?: boolean }[] = [
  { key: 'ufc', current: true },
  { key: 'ensinoMedio' },
] as const

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Experience')

  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          /{t('title').toLowerCase()}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
      </header>

      <div className="mt-12 grid gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="size-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">{t('professional')}</h2>
          </div>
          <ol className="relative space-y-8 border-l border-border pl-8">
            {WORK.map(({ key, current }) => (
              <li key={key} className="relative">
                <span
                  className={`absolute -left-9.25 mt-1.5 size-3 rounded-full border-2 ${
                    current ? 'border-primary bg-primary' : 'border-border bg-background'
                  }`}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-semibold">{t(`items.${key}.role`)}</h3>
                  {current && (
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {t('current')}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-primary">{t(`items.${key}.company`)}</p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {t(`items.${key}.period`)}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="size-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">{t('academic')}</h2>
          </div>
          <ol className="relative space-y-8 border-l border-border pl-8">
            {EDUCATION.map(({ key, current }) => (
              <li key={key} className="relative">
                <span
                  className={`absolute -left-9.25 mt-1.5 size-3 rounded-full border-2 ${
                    current ? 'border-primary bg-primary' : 'border-border bg-background'
                  }`}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-semibold">
                    {t(`items.${key}.title`)}
                  </h3>
                  {current && (
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {t('current')}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-primary">
                  {t(`items.${key}.institution`)}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {t(`items.${key}.period`)}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
