'use client'

import { Link } from '@/src/navigation'
import { twMerge } from 'tailwind-merge'

type NextLink = React.ComponentProps<typeof Link>

type LinkToUrlRootProps = NextLink & {
  background: 'transparent' | 'brand' | 'color'
}

export default function LinkToUrlRoot(props: LinkToUrlRootProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        'flex items-center justify-center rounded-sm transition-all duration-500',
        props.background === 'transparent' &&
          'bg-transparent text-slate-dark-6 dark:text-slate-light-3',
        props.background === 'brand' &&
          'dark:text-slate-light-3 text-slate-dark-6 bg-brand-mindaro bg-opacity-100 hover:bg-opacity-40 dark:bg-opacity-100 dark:bg-brand-indigo hover:dark:bg-opacity-40',
        props.background === 'color' && '',
        props.className,
      )}
    >
      {props.children}
    </Link>
  )
}
