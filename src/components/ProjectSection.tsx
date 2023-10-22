import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ProjectSectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {}

export default function ProjectSection({ ...props }: ProjectSectionProps) {
  return (
    <section
      className={twMerge(
        'w-full text-start px-4 pb-10 pt-10 shadow-md sm:px-[33px] md:px-28 xl:px-[16vw]',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </section>
  )
}
