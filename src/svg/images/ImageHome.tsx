import React from 'react'

type SvgProps = React.ComponentPropsWithoutRef<'svg'>

export default function HomeImage(props: SvgProps) {
  return (
    <svg
      {...props}
      viewBox="20 0 600 510"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M336 0L601.87 516H70.1302L336 0Z" fill="#4B0082" />
      <path d="M321.5 45L599.927 516H43.0728L321.5 45Z" fill="#4180AB" />
      <path d="M298.5 127L550.946 515.5H46.0536L298.5 127Z" fill="#BDD1DE" />
      <rect x="94" y="36" width="480" height="480" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_905_14" transform="scale(0.000976562)" />
        </pattern>
        <image
          id="image0_905_14"
          width="1024"
          height="1024"
        />
      </defs>
    </svg>
  )
}