import React from 'react'

type SvgProps = React.ComponentPropsWithoutRef<'svg'>

export default function IconDeveloper(props: SvgProps) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 18C21.1 18 21.99 17.1 21.99 16L22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V16C2 17.1 2.9 18 4 18H1C0.45 18 0 18.45 0 19C0 19.55 0.45 20 1 20H23C23.55 20 24 19.55 24 19C24 18.45 23.55 18 23 18H20ZM5 6H19C19.55 6 20 6.45 20 7V15C20 15.55 19.55 16 19 16H5C4.45 16 4 15.55 4 15V7C4 6.45 4.45 6 5 6Z" />
    </svg>
  )
}
