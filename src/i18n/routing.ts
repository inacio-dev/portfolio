import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    'br', // Português Brasileiro (padrão)
    'en', // Inglês
    'es', // Espanhol
    'zh', // Chinês Mandarim
  ],

  // Used when no locale matches
  defaultLocale: 'br',

  // Remove o prefixo para o locale padrão
  localePrefix: 'as-needed',

  // Detecta automaticamente pelo Accept-Language do navegador
  localeDetection: true,

  // Traduções de URLs/rotas
  pathnames: {
    // Rota principal
    '/': '/',
    // Portfolio/projetos
    '/portfolio': {
      br: '/portfolio',
      en: '/portfolio',
      es: '/portafolio',
      zh: '/作品集',
    },
    // Contato
    '/contact': {
      br: '/contato',
      en: '/contact',
      es: '/contacto',
      zh: '/联系',
    },
  },
})
