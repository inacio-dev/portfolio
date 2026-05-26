import * as React from 'react'

import { render, type RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'

import { TIME_ZONE } from '@/i18n/routing'
import ptBR from '@/messages/pt-BR.json'

/**
 * Wrapper para renderizar componentes que usam `useTranslations` /
 * `useLocale` em testes. Carrega messages do pt-BR por default —
 * sobrescreva via `options.messages` quando o teste exigir outro locale.
 *
 * Uso:
 * ```ts
 * import { renderWithIntl } from '@/tests/helpers/renderWithIntl'
 *
 * renderWithIntl(<CookieConsent />)
 * renderWithIntl(<CookieConsent />, { locale: 'en', messages: enMessages })
 * ```
 */
interface IntlRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string
  messages?: AbstractIntlMessages
}

export function renderWithIntl(
  ui: React.ReactElement,
  {
    locale = 'pt-BR',
    messages = ptBR as unknown as AbstractIntlMessages,
    ...rest
  }: IntlRenderOptions = {},
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={TIME_ZONE}>
        {children}
      </NextIntlClientProvider>
    ),
    ...rest,
  })
}
