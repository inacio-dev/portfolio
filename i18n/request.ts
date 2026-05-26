import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

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
    // Fixar timezone evita o warning ENVIRONMENT_FALLBACK e elimina o risco
    // de mismatch SSR/CSR quando o servidor roda em UTC e o cliente em GMT-3.
    // O usuário é de Fortaleza (BR) e o conteúdo é global, então fixamos em
    // São Paulo (mesmo offset, melhor reconhecimento de DST/feriados).
    timeZone: 'America/Sao_Paulo',
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
