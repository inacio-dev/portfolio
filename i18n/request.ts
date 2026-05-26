import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing, TIME_ZONE } from './routing'

/**
 * Config request-scoped do next-intl.
 *
 * Resolve o locale ativo a partir do segmento `[locale]` da rota — o
 * middleware (proxy.ts) já fez a negociação e injetou no path. Se o
 * locale for inválido, faz fallback para o default (pt-BR) em vez de
 * lançar — evita 500 quando algum crawler bate em URL mal-formada.
 *
 * Os messages são carregados via import dinâmico — Next consegue
 * code-split por locale e o bundle de cada idioma fica isolado.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    // Constante compartilhada com o NextIntlClientProvider — ver
    // `i18n/routing.ts` para a justificativa do timezone fixo.
    timeZone: TIME_ZONE,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
