import React from 'react'

type SvgProps = React.ComponentPropsWithoutRef<'svg'>

export default function AboutImage(props: SvgProps) {
  return (
    <svg
      {...props}
      width="447"
      height="400"
      viewBox="0 0 447 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M224.651 50L402.413 395H46.8894L224.651 50Z" fill="#4B0082" />
      <path d="M214.956 80.0872L401.114 395H28.7987L214.956 80.0872Z" fill="#4180AB" />
      <path d="M199.578 134.913L368.365 394.666H30.7916L199.578 134.913Z" fill="#BDD1DE" />
      <rect x="52" width="395" height="395" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_905_15" transform="scale(0.000976562)" />
        </pattern>
        <image
          id="image0_905_15"
          width="1024"
          height="1024"
        />
      </defs>
    </svg>
  )
}