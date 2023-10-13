'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'

import Spinner from '../assets/Spinner'
import useLocalStorage from '../hooks/useLocalStorage'
import { Link, usePathname } from '../navigation'

export default function Footer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const controls = useAnimation()
  const lang = useLocale()
  const t = useTranslations('Footer')
  const [visibleFooter, setVisibleFooter] = useLocalStorage('footer', false)

  const [disabledButton, setDisabledButton] = useState(visibleFooter)

  useEffect(() => {
    setVisibleFooter(pathname.includes('/records'))
  }, [pathname, setVisibleFooter])

  useEffect(() => {
    setDisabledButton(!visibleFooter)

    setTimeout(() => {
      !visibleFooter ? controls.start('hide') : controls.start('show')
    }, 200)
  }, [controls, visibleFooter])

  return (
    <motion.footer
      animate={controls}
      variants={{
        hide: {
          y: '101%',
          transition: { duration: 0.4 },
        },
        show: { y: 0, transition: { duration: 0.4 } },
      }}
      initial={visibleFooter ? 'show' : 'hide'}
      className="fixed bottom-0 z-50 flex h-14 w-full flex-row items-center justify-center space-x-10 rounded-t-sm bg-brand-mindaro py-5 text-lg text-slate-dark-6 shadow-xl transition-all duration-500 dark:bg-brand-indigo dark:text-slate-light-3 md:h-24 md:py-10 lg:space-x-20"
    >
      <Link
        href={{
          pathname: '/records',
          query: { view: searchParams.get('view') === 'ongoing' ? 'resume' : 'ongoing' },
        }}
        aria-disabled={disabledButton}
        className="inline-flex h-8 w-32 items-center justify-center rounded-sm bg-slate-light-1 text-base font-bold uppercase text-slate-dark-6 shadow-md transition-all duration-500 hover:bg-slate-light-3 dark:bg-slate-light-3/10 dark:text-slate-light-3 dark:hover:bg-slate-light-3/40 md:h-14 md:w-48 md:text-2xl"
      >
        {searchParams.get('view') ? (
          t(`${searchParams.get('view')}`)
        ) : (
          <Spinner className="fill-slate-dark-6 dark:fill-slate-light-3" />
        )}
      </Link>

      <a
        href={`/inacio-rodrigues-${lang === 'pt' ? 'curriculo' : 'cv'}.pdf`}
        className="inline-flex h-8 w-32 items-center justify-center rounded-sm bg-slate-light-1 text-base font-bold text-slate-dark-6 shadow-md transition-all duration-500 hover:bg-slate-light-3 dark:bg-slate-light-3/10 dark:text-slate-light-3 dark:hover:bg-slate-light-3/40 md:h-14 md:w-48 md:text-2xl"
        download
      >
        <p className="text-sm uppercase lg:text-xl">Download</p>
      </a>
    </motion.footer>
  )
}
