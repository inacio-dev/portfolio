import type { Metadata } from 'next'

import { Mail, MapPin } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ContactForm } from '@/components/forms/ContactForm'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { LinkedInIcon } from '@/components/icons/LinkedInIcon'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { TrackedExternalLink } from '@/components/TrackedExternalLink'
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, mailtoUrl, whatsappUrl } from '@/lib/site'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Contact' })
  return { title: t('title'), description: t('description') }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Contact')

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

      <div className="mt-12 grid gap-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="font-display text-xl font-semibold">{t('formTitle')}</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <aside>
          <h2 className="font-display text-xl font-semibold">{t('channelsTitle')}</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <TrackedExternalLink
                href={mailtoUrl()}
                event="email_clicked"
                eventParams={{ source: 'contact_page' }}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-card/70"
              >
                <Mail
                  className="mt-0.5 size-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-foreground">{t('channelEmail')}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </TrackedExternalLink>
            </li>
            <li>
              <TrackedExternalLink
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                event="whatsapp_opened"
                eventParams={{ source: 'contact_page' }}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-card/70"
              >
                <WhatsAppIcon
                  className="mt-0.5 size-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-foreground">{t('channelWhatsapp')}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    wa.me/Inácio
                  </p>
                </div>
              </TrackedExternalLink>
            </li>
            <li>
              <TrackedExternalLink
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                event="linkedin_clicked"
                eventParams={{ source: 'contact_page' }}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-card/70"
              >
                <LinkedInIcon
                  className="mt-0.5 size-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-foreground">{t('channelLinkedin')}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    /in/inacio-rodrigues-dev
                  </p>
                </div>
              </TrackedExternalLink>
            </li>
            <li>
              <TrackedExternalLink
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                event="github_clicked"
                eventParams={{ source: 'contact_page' }}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-card/70"
              >
                <GitHubIcon
                  className="mt-0.5 size-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-foreground">{t('channelGithub')}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    @inacio-dev
                  </p>
                </div>
              </TrackedExternalLink>
            </li>
            <li>
              <div className="flex items-start gap-3 rounded-lg border border-dashed border-border p-4">
                <MapPin className="mt-0.5 size-5 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {t('locationLabel')}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">{t('location')}</p>
                </div>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
