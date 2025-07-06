import { ComponentProps } from 'react'

interface WorkanaLogoProps extends ComponentProps<'svg'> {
  size?: number
}

export default function WorkanaLogo({ size = 22, className, ...props }: WorkanaLogoProps) {
  const aspectRatio = 22 / 22 // height / width
  const height = size * aspectRatio

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <defs>
        <path id="a" d="M0 0h9.424v6.427H0z" />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(-29, -3)">
        <path
          d="M39.911 8.763a9.488 9.488 0 0 1 4.714-1.243 9.58 9.58 0 0 1 2.27.272 9.464 9.464 0 0 0-6.984-3.051 9.464 9.464 0 0 0-6.984 3.051 9.58 9.58 0 0 1 2.271-.272c1.717 0 3.327.453 4.713 1.243"
          fill="#F5F5F5"
        />
        <path
          d="M30.858 11.44a9.169 9.169 0 0 0-.373 2.591c0 4.36 3.047 8.017 7.155 9.019a9.183 9.183 0 0 1-2.44-6.155 9.335 9.335 0 0 1-4.342-5.456"
          fill="#E5E5E5"
        />
        <path
          d="m35.2 16.895-.002-.084c0-3.44 1.896-6.441 4.713-8.048a9.488 9.488 0 0 0-4.713-1.243c-.783 0-1.543.095-2.27.272a9.24 9.24 0 0 0-2.07 3.647 9.336 9.336 0 0 0 4.341 5.456"
          fill="#EEEEEE"
        />
        <path
          d="M44.624 16.895a9.182 9.182 0 0 1-2.441 6.155c4.108-1.002 7.155-4.66 7.155-9.019 0-.9-.13-1.769-.373-2.592a9.336 9.336 0 0 1-4.341 5.456"
          fill="#E8E8E8"
        />
        <path
          d="M44.625 7.52a9.489 9.489 0 0 0-4.714 1.243c2.818 1.607 4.714 4.609 4.714 8.048l-.001.084a9.336 9.336 0 0 0 4.341-5.456 9.24 9.24 0 0 0-2.07-3.647 9.58 9.58 0 0 0-2.27-.272"
          fill="#EDEDED"
        />
        <g transform="translate(35.2 16.895)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M4.712 1.243A9.488 9.488 0 0 1 0 0a9.183 9.183 0 0 0 2.441 6.155 9.574 9.574 0 0 0 4.542 0A9.182 9.182 0 0 0 9.424 0a9.488 9.488 0 0 1-4.712 1.243"
            fill="#E0E0E0"
            mask="url(#b)"
          />
        </g>
        <path
          d="m35.198 16.81.001.085a9.488 9.488 0 0 0 4.712 1.242 9.488 9.488 0 0 0 4.713-1.242v-.084c0-3.44-1.895-6.441-4.713-8.048-2.817 1.607-4.713 4.609-4.713 8.048"
          fill="none"
        />
      </g>
    </svg>
  )
}
