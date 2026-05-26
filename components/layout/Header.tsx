'use client'

import * as React from 'react'

import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Link } from '@/components/Link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button as ShadcnButton } from '@/components/ui/button'
import { usePathname } from '@/i18n/navigation'
import { trackEvent } from '@/lib/analytics'
import { GITHUB_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Header sticky com nav, language switcher, theme toggle e link pro repo
 * do portfólio no GitHub.
 *
 * Mobile: nav vira sheet à la drawer top-down. Sem dep extra — só
 * `useState` + classe Tailwind. Para um drawer animado mais rico, plugar
 * o `Sheet` do shadcn aqui (precisaria reinstalar `components/ui/sheet`).
 */

interface NavItem {
  href: '/sobre' | '/projetos' | '/experiencia' | '/certificados' | '/contato'
  labelKey: 'about' | 'projects' | 'experience' | 'certifications' | 'contact'
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: '/sobre', labelKey: 'about' },
  { href: '/projetos', labelKey: 'projects' },
  { href: '/experiencia', labelKey: 'experience' },
  { href: '/certificados', labelKey: 'certifications' },
  { href: '/contato', labelKey: 'contact' },
] as const

export function Header() {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  // Fecha menu mobile ao mudar de rota
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground hover:text-primary"
        >
          inacio<span className="text-primary">.</span>dev
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {t(item.labelKey)}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('github_clicked', { source: 'header' })}
            aria-label="GitHub"
            title="GitHub"
            className="hidden size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <GitHubIcon className="size-4" />
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
          <ShadcnButton
            variant="ghost"
            size="icon"
            className="size-9 md:hidden"
            aria-label={isOpen ? t('closeMenu') : t('menu')}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </ShadcnButton>
        </div>
      </div>

      {isOpen && (
        <nav aria-label="Mobile" className="border-t border-border bg-background md:hidden">
          <ul className="container mx-auto flex flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
