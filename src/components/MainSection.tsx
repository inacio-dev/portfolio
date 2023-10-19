import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type MainSectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {}

export default function MainSection({ ...props }: MainSectionProps) {
  return (
    <main
      className={twMerge(
        'relative flex min-h-screen w-full flex-col items-center justify-center space-y-10 overflow-hidden bg-slate-light-3 px-4 pb-5 pt-24 text-center text-xs text-slate-dark-6 transition-colors duration-500 dark:bg-slate-dark-2 dark:text-slate-light-3 sm:px-[33px] sm:text-start md:px-28 md:pt-32 md:text-base xl:px-[16vw]',
        props.className,
      )}
    >
      {props.children}
    </main>
  )
}
