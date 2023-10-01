'use client'

import { useLocale } from 'next-intl'

import { Link, usePathname } from '../navigation'

export default function LanguageSwitcher() {
  const language = useLocale()
  const pathname = usePathname()

  return (
    <Link
      href={pathname}
      locale={language === 'pt' ? 'en' : 'pt'}
      className="flex h-14 w-14 items-center justify-center rounded-sm bg-slate-light-1/20 text-xl font-bold text-slate-dark-6 transition-all duration-500 hover:bg-slate-light-1/40 focus:bg-slate-light-1/20 dark:text-slate-light-3"
    >
      {language === 'pt' ? 'BR' : 'US'}
    </Link>
  )
}
