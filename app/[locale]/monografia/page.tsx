import type { Metadata } from 'next'
import Image from 'next/image'

import { Cpu, ExternalLink, Gauge } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { ThesisPdfButton } from '@/components/ThesisPdfButton'
import { ThesisReferences } from '@/components/ThesisReferences'
import { TrackedExternalLink } from '@/components/TrackedExternalLink'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Thesis' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

/**
 * Métricas-chave dos experimentos. Os valores são literais aos publicados
 * no banner acadêmico — formatação numérica permanece como está pra evitar
 * confusão com vírgula/ponto decimal entre locales (a maioria dos artigos
 * usa ponto, mas em pt-BR o autor optou por vírgula).
 *
 * As colunas (label, target, value) NÃO entram no JSON de tradução: os
 * números são universais e os labels seguem a tabela do banner. Os títulos
 * de bloco vêm de `Thesis.resultsCommunication` etc.
 */
type ResultGroup = {
  groupKey: 'resultsCommunication' | 'resultsVideo' | 'resultsForce' | 'resultsPower'
  rows: { metric: string; target: string; result: string }[]
}

const RESULTS: readonly ResultGroup[] = [
  {
    groupKey: 'resultsCommunication',
    rows: [
      { metric: 'Latência fim a fim (p50 / p99)', target: '< 100 ms', result: '55,3 / 107,7 ms' },
      { metric: 'Latência interna RPi (p50 / p99)', target: '< 1 ms', result: '0,22 / 0,40 ms' },
      { metric: 'Perda de pacotes (1080p)', target: '< 1 %', result: '0,46 / 0,13 %' },
    ],
  },
  {
    groupKey: 'resultsVideo',
    rows: [
      { metric: 'Câmera OV5647 (480p / 1080p)', target: '≥ 25 fps', result: '60 / 54 fps' },
      { metric: 'BMI160 — taxa / erro |g|', target: '≥ 95 Hz', result: '100 Hz / < 1 %' },
      { metric: 'Calibração geométrica BMI160', target: '—', result: '< 0,5°' },
      { metric: 'Violações de budget (10 ms)', target: '0', result: '0 / 983 mil' },
    ],
  },
  {
    groupKey: 'resultsForce',
    rows: [
      {
        metric: 'Latência sensor → atuação (p50 / p99)',
        target: '< 50 ms',
        result: '5,0 / 10,5 ms',
      },
      { metric: 'Força lateral em pista (pico)', target: '—', result: '39 %' },
      { metric: 'Vibração de impacto (pista)', target: '—', result: '92–96 %' },
    ],
  },
  {
    groupKey: 'resultsPower',
    rows: [
      { metric: 'Consumo médio (indoor / pista)', target: '—', result: '8,8 / 27,0 W' },
      { metric: 'Autonomia projetada', target: '≥ 15 min', result: '90–120 min' },
      { metric: 'Temperatura CPU (média / pico)', target: '< 80 °C', result: '< 50 °C' },
      { metric: 'Temperatura motor (S1 / S2 / S3)', target: '—', result: '33 / 40 / 56 °C' },
    ],
  },
] as const

const STACK_GROUPS = [
  { titleKey: 'stackEmbedded', listKey: 'stackEmbeddedList' },
  { titleKey: 'stackClient', listKey: 'stackClientList' },
  { titleKey: 'stackSimulator', listKey: 'stackSimulatorList' },
  { titleKey: 'stackPower', listKey: 'stackPowerList' },
] as const

/**
 * Sessões experimentais. Strings de foco são curtas e neutras o suficiente
 * para serem deixadas em pt-BR no catálogo (mesmo no en/es) — é uma tabela
 * técnica e o leitor que quiser detalhes lê o PDF.
 */
const INDOOR_SESSIONS = [
  { id: 'S01', focus: 'Motor escalonado 1ª → 3ª', minutes: 18.0 },
  { id: 'S02', focus: 'Direção + freio isolados', minutes: 12.0 },
  { id: 'S03', focus: 'Resolução × filtros de PDI', minutes: 15.3 },
  { id: 'S04', focus: 'Uso representativo completo', minutes: 15.0 },
  { id: 'S05', focus: 'Curva de descarga da bateria', minutes: 47.4 },
  { id: 'S06', focus: 'Trocas de marcha rápidas', minutes: 4.4 },
  { id: 'S07', focus: 'Filtros de PDI combinados', minutes: 7.0 },
  { id: 'S08', focus: 'Latência fim a fim', minutes: 5.0 },
  { id: 'S09', focus: 'Calibração do BMI160', minutes: 12.4 },
] as const

const EXTERNAL_SESSIONS = [
  { id: 'S1-ext', focus: 'Rolamento unidirecional', minutes: 2.0 },
  { id: 'S2-ext', focus: 'Direto sem rolamento', minutes: 15.7 },
  { id: 'S3-ext', focus: 'Direto reforçado (falha térmica)', minutes: 5.7 },
  { id: 'S4-ext', focus: 'Validação do motor retrabalhado', minutes: 4.7 },
] as const

const TCC_REPO_URL = 'https://github.com/inacio-dev/monografia'

export default async function ThesisPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Thesis')

  return (
    <article className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="max-w-4xl">
        <Badge variant="secondary" className="font-mono text-xs">
          {t('eyebrow')}
        </Badge>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t('fullTitle')}
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t('subtitle')}</p>

        <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {t('authorLabel')}
            </dt>
            <dd className="mt-1 font-medium text-foreground">Inácio Rodrigues de Matos Galvão</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {t('advisorLabel')}
            </dt>
            <dd className="mt-1 font-medium text-foreground">{t('advisor')}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {t('coadvisorLabel')}
            </dt>
            <dd className="mt-1 font-medium text-foreground">{t('coadvisor')}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {/* PDF da monografia desabilitado até a versão final ser depositada
              oficialmente. Tooltip indica que ainda não está disponível.
              Quando reativar, trocar pelo <TrackedExternalLink> original. */}
          <ThesisPdfButton label={t('ctaPdf')} tooltip={t('ctaPdfUnavailable')} />
          <Button asChild variant="outline" size="lg">
            <TrackedExternalLink
              href={TCC_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              event="github_repo_clicked"
              eventParams={{ source: 'thesis_hero', repo: 'monografia' }}
            >
              <GitHubIcon className="size-4" aria-hidden="true" />
              {t('ctaCode')}
            </TrackedExternalLink>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <TrackedExternalLink
              href="/monografia/banner.pdf"
              target="_blank"
              rel="noopener noreferrer"
              event="cv_downloaded"
              eventParams={{ doc: 'banner' }}
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              {t('ctaBanner')}
            </TrackedExternalLink>
          </Button>
        </div>
      </header>

      {/* Prototype + figure */}
      <section className="mt-16 grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {t('hypothesisTitle')}
          </h2>
          <p className="mt-3 text-muted-foreground">{t('hypothesis')}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold sm:text-3xl">
            {t('objectiveTitle')}
          </h2>
          <p className="mt-3 text-muted-foreground">{t('objective')}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold sm:text-3xl">
            {t('motivationTitle')}
          </h2>
          <p className="mt-3 text-muted-foreground">{t('motivation')}</p>
        </div>
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="relative aspect-4/5">
            <Image
              src="/monografia/prototipo.webp"
              alt={t('prototypeFigure')}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <figcaption className="border-t border-border bg-background/40 p-3 text-xs text-muted-foreground">
            {t('prototypeFigure')}
          </figcaption>
        </figure>
      </section>

      {/* Architecture */}
      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          {t('architectureTitle')}
        </h2>
        <p className="mt-3 max-w-4xl text-muted-foreground">{t('architectureDescription')}</p>
        <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          <div className="relative aspect-video">
            <Image
              src="/monografia/arquitetura.webp"
              alt={t('architectureFigure')}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-contain p-4"
            />
          </div>
          <figcaption className="border-t border-border bg-background/40 p-3 text-xs text-muted-foreground">
            {t('architectureFigure')}
          </figcaption>
        </figure>
      </section>

      {/* Stack */}
      <section className="mt-20">
        <div className="flex items-center gap-2">
          <Cpu className="size-5 text-primary" aria-hidden="true" />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('stackTitle')}</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {STACK_GROUPS.map((group) => (
            <Card key={group.titleKey}>
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-base">{t(group.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                  {t(group.listKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Motor model + FF */}
      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('modelTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{t('modelDescription')}</p>
          <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-video">
              <Image
                src="/monografia/zonas-eficiencia.webp"
                alt={t('zonesFigure')}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain p-3"
              />
            </div>
            <figcaption className="border-t border-border bg-background/40 p-3 text-xs text-muted-foreground">
              {t('zonesFigure')}
            </figcaption>
          </figure>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('ffTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{t('ffDescription')}</p>
          <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-video">
              <Image
                src="/monografia/g923.webp"
                alt={t('g923Figure')}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain p-6"
              />
            </div>
            <figcaption className="border-t border-border bg-background/40 p-3 text-xs text-muted-foreground">
              {t('g923Figure')}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Experiments */}
      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('experimentsTitle')}</h2>
        <p className="mt-3 max-w-4xl text-muted-foreground">{t('experimentsDescription')}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base">
                {t('indoorLabel')}{' '}
                <span className="text-muted-foreground">· 9 sessões · 136,5 min</span>
              </CardTitle>
              <CardDescription>~814 mil {t('samplesLabel')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border text-sm">
                {INDOOR_SESSIONS.map((s) => (
                  <li key={s.id} className="flex items-baseline justify-between gap-3 py-2">
                    <span className="font-mono text-xs text-primary">{s.id}</span>
                    <span className="flex-1 text-muted-foreground">{s.focus}</span>
                    <span className="font-mono text-xs text-foreground">
                      {s.minutes.toFixed(1)} min
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base">
                {t('externalLabel')}{' '}
                <span className="text-muted-foreground">· 4 sessões · 28,1 min</span>
              </CardTitle>
              <CardDescription>~168 mil {t('samplesLabel')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border text-sm">
                {EXTERNAL_SESSIONS.map((s) => (
                  <li key={s.id} className="flex items-baseline justify-between gap-3 py-2">
                    <span className="font-mono text-xs text-primary">{s.id}</span>
                    <span className="flex-1 text-muted-foreground">{s.focus}</span>
                    <span className="font-mono text-xs text-foreground">
                      {s.minutes.toFixed(1)} min
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results */}
      <section className="mt-20">
        <div className="flex items-center gap-2">
          <Gauge className="size-5 text-primary" aria-hidden="true" />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('resultsTitle')}</h2>
        </div>
        <p className="mt-3 max-w-4xl text-muted-foreground">{t('resultsDescription')}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {RESULTS.map((group) => (
            <Card key={group.groupKey}>
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-base">{t(group.groupKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    {group.rows.map((row, i) => (
                      <tr key={i} className="align-top">
                        <td className="py-2 pr-3 text-muted-foreground">{row.metric}</td>
                        <td className="hidden py-2 pr-3 text-right font-mono text-xs text-muted-foreground/70 sm:table-cell">
                          {row.target}
                        </td>
                        <td className="py-2 text-right font-mono text-sm font-medium text-foreground">
                          {row.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ))}
        </div>

        <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <div className="relative aspect-video">
            <Image
              src="/monografia/latencia-cdf.webp"
              alt={t('latencyFigure')}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-contain p-4"
            />
          </div>
          <figcaption className="border-t border-border bg-background/40 p-3 text-xs text-muted-foreground">
            {t('latencyFigure')}
          </figcaption>
        </figure>
      </section>

      {/* Conclusion */}
      <section className="mt-20 max-w-4xl">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('conclusionTitle')}</h2>
        <p className="mt-3 text-muted-foreground">{t('conclusion')}</p>
      </section>

      {/* References — 53 entradas agrupadas em <details> colapsáveis */}
      <ThesisReferences />
    </article>
  )
}
