'use client'

import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

import { dataLayerPushSelectContent } from '../utils/GTM'

type ProjectLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  content_id: string
}

export default function ProjectLink({ content_id, ...props }: ProjectLinkProps) {
  return (
    <div className="flex items-center justify-center py-6 md:py-10">
      <a
        {...props}
        onClick={() => dataLayerPushSelectContent(content_id, 'project_link')}
        target="_blank"
        rel="noopener noreferrer"
        className="my-0 flex h-14 w-fit items-center justify-center rounded-sm bg-brand-mindaro/100 fill-slate-dark-6 px-4 font-bold uppercase text-slate-dark-6 transition-all duration-500 hover:bg-brand-mindaro/40 dark:bg-brand-indigo/100 dark:fill-slate-light-3 dark:text-slate-light-3 dark:hover:bg-brand-indigo/40 md:my-6"
      >
        {props.children}
      </a>
    </div>
  )
}
