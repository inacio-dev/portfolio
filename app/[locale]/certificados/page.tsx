import type { Metadata } from 'next'

import { Award, FileText } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CERTIFICATIONS, type CertificateCategory } from '@/lib/certifications'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Certifications' })
  return { title: t('title'), description: t('description') }
}

const CATEGORY_LABEL: Record<CertificateCategory, string> = {
  tech: 'Tech',
  business: 'Negócios',
  language: 'Idiomas',
  academic: 'Acadêmico',
  event: 'Eventos',
}

const CATEGORY_ORDER: readonly CertificateCategory[] = [
  'tech',
  'business',
  'language',
  'academic',
  'event',
]

export default async function CertificationsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Certifications')

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: CERTIFICATIONS.filter((c) => c.category === category).sort((a, b) =>
      b.year.localeCompare(a.year),
    ),
  })).filter((g) => g.items.length > 0)

  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          /{t('title').toLowerCase()}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('description')}</p>
      </header>

      <div className="mt-12 space-y-12">
        {groups.map(({ category, items }) => (
          <section key={category}>
            <div className="mb-4 flex items-center gap-2">
              <Award className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">{CATEGORY_LABEL[category]}</h2>
              <span className="font-mono text-xs text-muted-foreground">({items.length})</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((cert) => (
                <Card key={cert.slug}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="font-display text-sm leading-tight">
                        {cert.title}
                      </CardTitle>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {cert.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                    >
                      <FileText className="size-3.5" aria-hidden="true" />
                      {t('viewPdf')}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
