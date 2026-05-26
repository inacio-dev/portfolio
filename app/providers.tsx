'use client'

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'

import { ThemeProvider } from '@/components/ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TIME_ZONE } from '@/i18n/routing'

/**
 * Providers globais — ordem importa:
 *
 * - `NextIntlClientProvider` por fora: client components precisam do
 *   contexto i18n para `useTranslations`. Como passamos `messages`
 *   explicitamente, também precisamos passar `timeZone` — caso contrário
 *   o next-intl não consegue herdar do server config e dispara o warning
 *   `ENVIRONMENT_FALLBACK` na primeira renderização do client.
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
    <NextIntlClientProvider messages={messages} locale={locale} timeZone={TIME_ZONE}>
      <ThemeProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
