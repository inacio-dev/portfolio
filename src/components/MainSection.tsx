import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type MainSectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {}

export default function MainSection(props: MainSectionProps) {
  return (
    <main
      className={twMerge(
        'flex min-h-screen w-full flex-col overflow-hidden items-center justify-center space-y-10 bg-slate-light-3 px-4 pb-5 pt-24 text-center text-slate-dark-6 transition-colors duration-500 dark:bg-slate-dark-2 dark:text-slate-light-3 sm:px-10 md:px-0 md:pb-0 md:pt-32 md:text-start',
        props.className,
      )}
    >
      {props.children}
    </main>
  )
}
