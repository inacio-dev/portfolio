import React from 'react'

type SvgProps = React.ComponentPropsWithoutRef<'svg'>

export default function IconTour(props: SvgProps) {
  return (
    <svg
      {...props}
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.375 37.125L37.125 27L21.375 16.875V37.125ZM11.25 47.25C10.0125 47.25 8.95275 46.809 8.07075 45.927C7.18875 45.045 6.7485 43.986 6.75 42.75V11.25C6.75 10.0125 7.191 8.95275 8.073 8.07075C8.955 7.18875 10.014 6.7485 11.25 6.75H42.75C43.9875 6.75 45.0473 7.191 45.9293 8.073C46.8113 8.955 47.2515 10.014 47.25 11.25V42.75C47.25 43.9875 46.809 45.0473 45.927 45.9293C45.045 46.8113 43.986 47.2515 42.75 47.25H11.25Z"
        fill="#FBFCFD"
      />
    </svg>
  )
}
