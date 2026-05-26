import type { Metadata } from 'next'

import { ExternalLink } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { TrackedExternalLink } from '@/components/TrackedExternalLink'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PROJECTS } from '@/lib/projects'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Projects' })
  return { title: t('title'), description: t('description') }
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Projects')

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

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <Card
            key={project.key}
            className="group flex flex-col transition-colors hover:border-primary/40"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="font-display text-lg">
                    {t(`items.${project.key}.title`)}
                  </CardTitle>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {t(`items.${project.key}.subtitle`)}
                  </p>
                </div>
                {project.featured && (
                  <Badge className="font-mono text-[10px]">{t('featured')}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                {t(`items.${project.key}.description`)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-mono text-[10px]">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-2 text-sm">
                {project.repoUrl && (
                  <TrackedExternalLink
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    event="project_clicked"
                    eventParams={{ project: project.key, source: 'projects_page', target: 'repo' }}
                    className="group/link inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <GitHubIcon
                      className="size-4 transition-transform duration-200 ease-out group-hover/link:scale-110"
                      aria-hidden="true"
                    />
                    {t('viewCode')}
                  </TrackedExternalLink>
                )}
                {project.liveUrl && (
                  <TrackedExternalLink
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    event="project_clicked"
                    eventParams={{ project: project.key, source: 'projects_page', target: 'live' }}
                    className="group/link inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ExternalLink
                      className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    {t('viewLive')}
                  </TrackedExternalLink>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
