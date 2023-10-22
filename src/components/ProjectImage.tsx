/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'

type NextImage = React.ComponentProps<typeof Image>

type ProjectImageProps = NextImage & {}

export default function ProjectImage({ ...props }: ProjectImageProps) {
  return (
    <div className="relative flex h-56 w-full items-center justify-center overflow-hidden py-4 md:h-72 md:py-10">
      <Image {...props} className="h-full w-full object-cover object-center" />
    </div>
  )
}
