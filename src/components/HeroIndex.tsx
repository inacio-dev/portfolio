'use client'

import { unstable_getImgProps as getImgProps } from 'next/image'
import heroDesktopImg from '@/public/hero-home-lg.png'
import heroTabletImg from '@/public/hero-home-md.png'
import heroMobileImg from '@/public/hero-home-sm.png'
import heroDesktopPlusImg from '@/public/hero-home-xl.png'

export default function HeroIndex() {
  const commom = { alt: 'Hero', quality: 100 }

  const {
    props: { srcSet: mobile },
  } = getImgProps({ ...commom, src: heroMobileImg, priority: true })
  const {
    props: { srcSet: tablet },
  } = getImgProps({ ...commom, src: heroTabletImg, priority: true })
  const {
    props: { srcSet: desktop },
  } = getImgProps({ ...commom, src: heroDesktopImg, priority: true })
  const {
    props: { srcSet: plus, ...props },
  } = getImgProps({ ...commom, src: heroDesktopPlusImg, priority: true })

  return (
    <div className="bottom-0 grid w-full translate-x-0 items-center justify-center opacity-100 transition-opacity duration-500 dark:opacity-70 sm:absolute sm:w-auto sm:translate-x-[35%] xl:translate-x-[75%]">
      <picture>
        <source media="(max-width: 345px)" srcSet={mobile} />
        <source media="(max-width: 510px)" srcSet={tablet} />
        <source media="(max-width: 1536px)" srcSet={desktop} />
        <source media="(min-width: 1535px)" srcSet={plus} />
        <img
          {...props}
          className="h-auto w-[calc(100vw-56px)] md:w-[calc(100vh-96px)]"
          fetchPriority="high"
          loading="eager"
          alt="Hero"
        />
      </picture>
    </div>
  )
}
