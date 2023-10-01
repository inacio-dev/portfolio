'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'

import Logo from '../assets/icons/Logo'
import useHeaderAnimation from '../hooks/useHeaderAnimation'

type LogoHeaderAnimationProps = {
  title: string
}

export default function LogoHeaderAnimation({ title }: LogoHeaderAnimationProps) {
  const [animate] = useHeaderAnimation()
  const controlsTitle = useAnimation()

  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    controlsTitle.start(animate ? 'visible' : isHovered ? 'visible' : 'hidden')
  }, [animate, controlsTitle, isHovered])

  return (
    <Link
      href="/"
      className={
        'absolute left-0 flex flex-row items-center justify-center space-x-3 pl-[16px] sm:pl-[33px] md:pl-28 xl:pl-[16vw]'
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Logo className="h-[30px] w-[36px] fill-slate-dark-6 transition-all duration-500 dark:fill-slate-light-3 md:h-auto md:w-auto" />

      <motion.div
        animate={controlsTitle}
        variants={{
          visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.2 } },
          hidden: { opacity: 0, x: -30, transition: { duration: 1, delay: 0.2 } },
        }}
        initial="hidden"
      >
        <h1 className="text-xl font-extrabold uppercase text-slate-dark-6 transition-all duration-100 dark:text-slate-light-3">
          {title}
        </h1>
      </motion.div>
    </Link>
  )
}
