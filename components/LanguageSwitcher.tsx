'use client'

import * as React from 'react'

import { Languages } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Button as ShadcnButton } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { trackEvent } from '@/lib/analytics'

/**
 * Switcher de idioma — troca o locale ativo preservando o pathname atual.
 *
 * `usePathname` do next-intl devolve o pathname **sem o prefixo de
 * locale** (`/projetos`, não `/en/projects`), e o `router.replace` aceita
 * o `locale` como option para emitir a URL correta no idioma de destino.
 *
 * Para pathnames traduzidos (`/projetos` ↔ `/projects`), o router consulta
 * o mapping em `i18n/routing.ts` automaticamente — basta passar o
 * pathname interno (canônico em pt-BR).
 */

const LOCALE_LABEL: Record<Locale, string> = {
  'pt-BR': 'Português',
  en: 'English',
  es: 'Español',
}

const LOCALE_SHORT: Record<Locale, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
}

export function LanguageSwitcher() {
  const t = useTranslations('Nav')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (nextLocale: Locale) => {
    if (nextLocale === locale) return
    trackEvent('language_changed', { from: locale, to: nextLocale })
    // O `pathname` aqui é o canônico (pt-BR). O router resolve para o
    // pathname traduzido do `nextLocale` automaticamente.
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadcnButton
          variant="ghost"
          size="sm"
          className="gap-1.5 px-2 font-mono text-xs"
          aria-label={t('language')}
        >
          <Languages className="size-4" aria-hidden="true" />
          {LOCALE_SHORT[locale]}
        </ShadcnButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {routing.locales.map((available) => (
          <DropdownMenuItem
            key={available}
            onClick={() => handleSelect(available)}
            data-active={available === locale}
            className="data-[active=true]:font-semibold"
          >
            <span className="mr-2 font-mono text-xs text-muted-foreground">
              {LOCALE_SHORT[available]}
            </span>
            {LOCALE_LABEL[available]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
