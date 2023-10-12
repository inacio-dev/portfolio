'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'

import useLocalStorage from '../hooks/useLocalStorage'
import NavigationLinks from './NavigationLinks'

export default function NavigationMobile() {
  const [visibleHeaderMobile, setVisibleHeaderMobile] = useLocalStorage('header-mobile', false)
  const controlsMenu = useAnimation()
  const controlsLinks = useAnimation()
  const pathname = usePathname()

  const [isHiddenLinks, setIsHiddenLinks] = useState(true)

  useEffect(() => {
    setTimeout(
      () => {
        setIsHiddenLinks(!visibleHeaderMobile)
      },
      visibleHeaderMobile ? 300 : 50,
    )

    controlsLinks.start(visibleHeaderMobile ? 'visible' : 'hidden')
    controlsMenu.start(visibleHeaderMobile ? 'visible' : 'hidden')
  }, [controlsLinks, controlsMenu, visibleHeaderMobile])

  useEffect(() => {
    setVisibleHeaderMobile(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <motion.div
      animate={controlsMenu}
      variants={{
        visible: {
          height: 200,
          transition: { duration: 0.3, delay: 0.1 },
        },
        hidden: {
          height: 0,
          transition: { duration: 0.3 },
        },
      }}
      initial="hidden"
      className="flex w-full items-center justify-center overflow-hidden bg-brand-mindaro text-slate-light-3 shadow-md transition-all duration-500 dark:bg-brand-indigo md:hidden"
    >
      <NavigationLinks isHiddenLinks={isHiddenLinks} controlsLinks={controlsLinks} mobile />
    </motion.div>
  )
}
