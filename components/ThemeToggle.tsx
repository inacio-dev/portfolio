'use client'

import * as React from 'react'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { Button as ShadcnButton } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { trackEvent } from '@/lib/analytics'

/**
 * Botão de troca de tema (light / dark / system) via `next-themes`.
 *
 * Renderiza placeholder no SSR / antes da hidratação porque o tema real
 * vive no localStorage — sem o guard `mounted`, o React acusa hydration
 * mismatch quando o tema persistido difere do default.
 */
export function ThemeToggle() {
  const t = useTranslations('Nav')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value)
    trackEvent('theme_changed', { theme: value })
  }

  if (!mounted) {
    return (
      <ShadcnButton variant="ghost" size="icon" aria-label={t('theme')} className="size-9">
        <Sun className="size-4" aria-hidden="true" />
      </ShadcnButton>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadcnButton variant="ghost" size="icon" aria-label={t('theme')} className="size-9">
          <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </ShadcnButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        <DropdownMenuItem onClick={() => handleChange('light')} data-active={theme === 'light'}>
          <Sun className="mr-2 size-4" aria-hidden="true" />
          {t('themeLight')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('dark')} data-active={theme === 'dark'}>
          <Moon className="mr-2 size-4" aria-hidden="true" />
          {t('themeDark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('system')} data-active={theme === 'system'}>
          <Monitor className="mr-2 size-4" aria-hidden="true" />
          {t('themeSystem')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
