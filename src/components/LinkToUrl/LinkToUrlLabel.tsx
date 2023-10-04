import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type LinkToUrlLabelProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {}

export default function LinkToUrlLabel(props: LinkToUrlLabelProps) {
  return (
    <span
      className={twMerge(
        'transition-all duration-500 text-xl font-bold uppercase',
        props.className,
      )}
    >
      {props.children}
    </span>
  )
}
