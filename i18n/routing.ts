import { defineRouting } from 'next-intl/routing'

/**
 * Configuração de roteamento i18n.
 *
 * - `pt-BR` é o default e NÃO leva prefixo na URL (`/sobre`, `/projetos`).
 * - `en` e `es` levam prefixo (`/en/about`, `/es/sobre`).
 *
 * O `pathnames` permite traduzir os segmentos da rota por locale —
 * `/projetos` em pt-BR vira `/projects` em inglês e `/proyectos` em espanhol.
 * Bom para SEO (palavra-chave no path) e UX (URL legível no idioma do
 * visitante).
 *
 * Quando adicionar uma página nova, registrar o mapping aqui — caso
 * contrário o `<Link>` do next-intl não consegue type-check o pathname.
 */
export const routing = defineRouting({
  locales: ['pt-BR', 'en', 'es'] as const,
  defaultLocale: 'pt-BR',
  localePrefix: {
    mode: 'as-needed',
  },
  pathnames: {
    '/': '/',
    '/sobre': {
      'pt-BR': '/sobre',
      en: '/about',
      es: '/sobre-mi',
    },
    '/projetos': {
      'pt-BR': '/projetos',
      en: '/projects',
      es: '/proyectos',
    },
    '/experiencia': {
      'pt-BR': '/experiencia',
      en: '/experience',
      es: '/experiencia',
    },
    '/certificados': {
      'pt-BR': '/certificados',
      en: '/certifications',
      es: '/certificados',
    },
    '/contato': {
      'pt-BR': '/contato',
      en: '/contact',
      es: '/contacto',
    },
    '/privacidade': {
      'pt-BR': '/privacidade',
      en: '/privacy',
      es: '/privacidad',
    },
    '/termos': {
      'pt-BR': '/termos',
      en: '/terms',
      es: '/terminos',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
