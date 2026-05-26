'use client'

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'

import { ThemeProvider } from '@/components/ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * Providers globais — ordem importa:
 *
 * - `NextIntlClientProvider` por fora: client components precisam do
 *   contexto i18n para `useTranslations`. As messages chegam por prop
 *   (já injetadas no server pelo layout do locale).
 * - `ThemeProvider` (next-themes) em seguida: aplica classe no `<html>`.
 * - `TooltipProvider` mais interno: só afeta o subtree onde tem tooltip.
 *
 * `'use client'` obrigatório aqui por causa do `useContext` interno dos
 * providers. Como recebemos `messages` como prop serializável, o boundary
 * client fica restrito a este arquivo.
 */
interface ProvidersProps {
  children: React.ReactNode
  messages: AbstractIntlMessages
  locale: string
}

export function Providers({ children, messages, locale }: ProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
