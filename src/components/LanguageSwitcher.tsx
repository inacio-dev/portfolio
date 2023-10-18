'use client'

import { useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'

import { Link, usePathname } from '../navigation'

export default function LanguageSwitcher() {
  const language = useLocale()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <Link
      href={{ pathname, query: { view: searchParams.get('view') } }}
      locale={language === 'pt' ? 'en' : 'pt'}
      replace
      className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-light-1 text-base font-bold text-slate-dark-6 shadow-md transition-all duration-500 hover:bg-slate-light-3 dark:bg-slate-light-3/10 dark:text-slate-light-3 dark:hover:bg-slate-light-3/40 md:h-12 md:w-12 md:text-xl"
    >
      {language === 'pt' ? 'BR' : 'EN'}
    </Link>
  )
}
