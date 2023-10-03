import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation'

export const locales = ['en', 'pt'] as const

export const pathnames = {
  '/': '/',

  '/records': {
    en: '/records',
    pt: '/historico',
  },
  '/about': {
    en: '/about',
    pt: '/sobre',
  },
  '/projects': {
    en: '/projects',
    pt: '/projetos',
  },
  '/terms': {
    en: '/terms',
    pt: '/termos',
  },
} satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, pathnames })
