'use client'

import { DetailedHTMLProps, HTMLAttributes } from 'react'
import clsx from 'clsx'
import { AnimationControls, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Link } from '../navigation'

type NavLinksProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  isHiddenLinks: boolean
  controlsLinks: AnimationControls
  mobile?: boolean
}

export default function NavLinks({
  isHiddenLinks,
  controlsLinks,
  mobile,
  ...props
}: NavLinksProps) {
  const t = useTranslations('Header.menu')

  const keys = ['/', '/records', '/about', '/projects', '/terms'] as const

  return (
    <nav className={props.className}>
      <motion.ul
        animate={controlsLinks}
        variants={{
          visible: {
            opacity: 1,
            transition: { duration: 0.2, delay: 0.2 },
          },
          hidden: {
            opacity: 0,
            transition: { duration: 0.2 },
          },
        }}
        initial="hidden"
        className={clsx(
          'grid h-full w-full grid-cols-2 items-center justify-center gap-10 sm:grid-cols-3 md:flex md:flex-row md:gap-0',
          isHiddenLinks ? 'hidden' : 'block',
        )}
      >
        {keys.map((key, index) => (
          <li
            key={index}
            className={clsx(
              'h-full',
              mobile && 'border-b-2 border-b-brand-indigo dark:border-b-slate-light-3',
            )}
          >
            <Link
              href={{
                pathname: key,
              }}
              className="flex h-full items-center justify-center px-5 text-slate-dark-6 transition-all duration-300 hover:bg-slate-light-6 dark:text-slate-light-3 dark:hover:bg-slate-light-3/20"
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </motion.ul>
    </nav>
  )
}
