import { Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { LinkedInIcon } from '@/components/icons/LinkedInIcon'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { Link } from '@/components/Link'
import { TrackedExternalLink } from '@/components/TrackedExternalLink'
import { GITHUB_URL, LINKEDIN_URL, mailtoUrl, PORTFOLIO_REPO_URL, whatsappUrl } from '@/lib/site'

/**
 * Footer com tagline, links sociais, links legais (privacidade/termos)
 * e copyright dinâmico.
 *
 * Server Component — usa `getTranslations` em vez de `useTranslations`
 * porque queremos resolver o ano atual no servidor (evita hydration
 * mismatch em viragem de ano).
 */
export async function Footer() {
  const t = await getTranslations('Footer')
  const tContact = await getTranslations('Contact')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">
              inacio<span className="text-primary">.</span>dev
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{t('tagline')}</p>
            <p className="mt-1 text-xs text-muted-foreground/80">{t('builtWith')}</p>
          </div>

          <nav aria-label="Social">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {tContact('channelsTitle')}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <TrackedExternalLink
                  href={mailtoUrl()}
                  event="email_clicked"
                  eventParams={{ source: 'footer' }}
                  className="group/social inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail
                    className="size-4 transition-transform duration-200 ease-out group-hover/social:scale-110"
                    aria-hidden="true"
                  />
                  {tContact('channelEmail')}
                </TrackedExternalLink>
              </li>
              <li>
                <TrackedExternalLink
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="whatsapp_opened"
                  eventParams={{ source: 'footer' }}
                  className="group/social inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <WhatsAppIcon
                    className="size-4 transition-transform duration-200 ease-out group-hover/social:scale-110"
                    aria-hidden="true"
                  />
                  WhatsApp
                </TrackedExternalLink>
              </li>
              <li>
                <TrackedExternalLink
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="linkedin_clicked"
                  eventParams={{ source: 'footer' }}
                  className="group/social inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LinkedInIcon
                    className="size-4 transition-transform duration-200 ease-out group-hover/social:scale-110"
                    aria-hidden="true"
                  />
                  LinkedIn
                </TrackedExternalLink>
              </li>
              <li>
                <TrackedExternalLink
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="github_clicked"
                  eventParams={{ source: 'footer' }}
                  className="group/social inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GitHubIcon
                    className="size-4 transition-transform duration-200 ease-out group-hover/social:scale-110"
                    aria-hidden="true"
                  />
                  GitHub
                </TrackedExternalLink>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacidade"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('terms')}
                </Link>
              </li>
              <li>
                <TrackedExternalLink
                  href={PORTFOLIO_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="github_repo_clicked"
                  eventParams={{ source: 'footer' }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('sourceCode')}
                </TrackedExternalLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t('copyright', { year })}</p>
          <p className="font-mono">Fortaleza — CE 🇧🇷</p>
        </div>
      </div>
    </footer>
  )
}
