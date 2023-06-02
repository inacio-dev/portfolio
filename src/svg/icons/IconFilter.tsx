import React from 'react'

type SvgProps = React.ComponentPropsWithoutRef<'svg'>

export default function IconFilter(props: SvgProps) {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.25006 5.61C6.27006 8.2 10.0001 13 10.0001 13V19C10.0001 19.55 10.4501 20 11.0001 20H13.0001C13.5501 20 14.0001 19.55 14.0001 19V13C14.0001 13 17.7201 8.2 19.7401 5.61C19.8547 5.46237 19.9255 5.28553 19.9445 5.09961C19.9636 4.91368 19.93 4.72615 19.8477 4.55837C19.7654 4.39059 19.6376 4.24929 19.4789 4.15058C19.3202 4.05186 19.137 3.99969 18.9501 4H5.04006C4.21006 4 3.74006 4.95 4.25006 5.61Z"
        fill="#FBFCFD"
      />
    </svg>
  )
}
