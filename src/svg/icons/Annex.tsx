import React from 'react'

type SvgProps = React.ComponentPropsWithoutRef<'svg'>

export default function IconAnnex(props: SvgProps) {
  return (
    <svg
      {...props}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H11V3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5ZM19 3H13V11H21V5C21 3.9 20.1 3 19 3ZM13 21H19C20.1 21 21 20.1 21 19V13H13V21Z"
        fill="#FBFCFD"
      />
    </svg>
  )
}
