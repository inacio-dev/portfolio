import { ArrowRight, Briefcase, Code2, GraduationCap, Sparkles } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { Link } from '@/components/Link'
import { TrackedExternalLink } from '@/components/TrackedExternalLink'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PROJECTS } from '@/lib/projects'
import { PORTFOLIO_REPO_URL, whatsappUrl } from '@/lib/site'

interface PageProps {
  params: Promise<{ locale: string }>
}

/**
 * Home — apresentação rápida, projetos em destaque, CTA pro repositório
 * deste portfólio (transparência: "veja como foi construído").
 *
 * Server Component — renderização estática a partir das messages do
 * locale. Nenhum JS de cliente necessário aqui.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Home')
  const tProjects = await getTranslations('Projects')

  const featuredProjects = PROJECTS.filter((p) => p.featured)

  return (
    <>
      {/* Hero */}
      <section className="bg-dotted relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="font-mono text-xs">
              {t('eyebrow')}
            </Badge>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t('heroSubtitle')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group font-medium">
                <Link
                  href="/projetos"
                  analyticsEvent="cta_clicked"
                  analyticsParams={{ source: 'home_hero_primary' }}
                >
                  {t('ctaPrimary')}
                  <ArrowRight
                    className="ml-2 size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <TrackedExternalLink
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="whatsapp_opened"
                  eventParams={{ source: 'home_hero' }}
                >
                  {t('ctaSecondary')}
                </TrackedExternalLink>
              </Button>
            </div>

            <TrackedExternalLink
              href={PORTFOLIO_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              event="github_repo_clicked"
              eventParams={{ source: 'home_hero' }}
              className="group mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <GitHubIcon className="size-4 transition-transform duration-200 ease-out group-hover:scale-110" />
              <span>{t('ctaGithubRepo')}</span>
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </TrackedExternalLink>
          </div>
        </div>
      </section>

      {/* Currently */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {t('currentTitle')}
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <p className="flex items-start gap-3 text-base">
              <Briefcase className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <span>{t('currentRole')}</span>
            </p>
            <p className="flex items-start gap-3 text-base">
              <GraduationCap className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <span>{t('currentEducation')}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {t('highlightsTitle')}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card className="group transition-colors hover:border-primary/40">
              <CardHeader>
                <Code2
                  className="size-6 text-primary transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6"
                  aria-hidden="true"
                />
                <CardTitle className="mt-2 font-display text-lg">
                  {t('highlightProjectsTitle')}
                </CardTitle>
                <CardDescription>{t('highlightProjectsDescription')}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="group transition-colors hover:border-primary/40">
              <CardHeader>
                <Sparkles
                  className="size-6 text-primary transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-12"
                  aria-hidden="true"
                />
                <CardTitle className="mt-2 font-display text-lg">
                  {t('highlightSkillsTitle')}
                </CardTitle>
                <CardDescription>{t('highlightSkillsDescription')}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="group transition-colors hover:border-primary/40">
              <CardHeader>
                <Briefcase
                  className="size-6 text-primary transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6"
                  aria-hidden="true"
                />
                <CardTitle className="mt-2 font-display text-lg">
                  {t('highlightExperienceTitle')}
                </CardTitle>
                <CardDescription>{t('highlightExperienceDescription')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {tProjects('title')}
              </h2>
              <p className="mt-2 text-muted-foreground">{tProjects('description')}</p>
            </div>
            <Link
              href="/projetos"
              className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              analyticsEvent="cta_clicked"
              analyticsParams={{ source: 'home_projects_more' }}
            >
              {t('viewAllProjects')}
              <ArrowRight
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card
                key={project.key}
                className="group flex flex-col transition-colors hover:border-primary/40"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="font-display text-lg">
                      {tProjects(`items.${project.key}.title`)}
                    </CardTitle>
                    {project.repoUrl && (
                      <TrackedExternalLink
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        event="project_clicked"
                        eventParams={{ project: project.key, source: 'home_card', target: 'repo' }}
                        aria-label={tProjects('viewCode')}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <GitHubIcon
                          className="size-4 transition-transform duration-200 ease-out group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </TrackedExternalLink>
                    )}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {tProjects(`items.${project.key}.subtitle`)}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    {tProjects(`items.${project.key}.description`)}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="font-mono text-[10px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
