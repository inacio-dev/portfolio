import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

type ProjectLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {}

export default function ProjectLink({ ...props }: ProjectLinkProps) {
  return (
    <div className="flex items-center justify-center py-10">
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="my-6 flex h-14 w-fit items-center justify-center rounded-sm bg-brand-mindaro/100 fill-slate-dark-6 px-4 font-bold uppercase text-slate-dark-6 transition-all duration-500 hover:bg-brand-mindaro/40 dark:bg-brand-indigo/100 dark:fill-slate-light-3 dark:text-slate-light-3 dark:hover:bg-brand-indigo/40"
      >
        {props.children}
      </a>
    </div>
  )
}
