'use client'

import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'

import Spinner from '../assets/icons/Spinner'
import useLocalStorage from '../hooks/useLocalStorage'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { usePathname } from '../navigation'
import NavigationLinks from './NavigationLinks'

export default function Navigation() {
  const controlsIcon = useAnimation()
  const controlsLinks = useAnimation()
  const { width, loaded } = useWindowDimensions()
  const pathname = usePathname()
  const [visibleHeaderMobile, setVisibleHeaderMobile] = useLocalStorage('header-mobile', false)

  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHiddenIcon, setIsHiddenIcon] = useState(false)
  const [isHiddenLinks, setIsHiddenLinks] = useState(true)

  useEffect(() => {
    if (!mounted || !loaded) return

    if (isHovered) {
      setTimeout(() => {
        setIsHiddenIcon(true)
      }, 200)

      setIsHiddenLinks(false)
    } else {
      setIsHiddenIcon(false)

      setTimeout(() => {
        setIsHiddenLinks(true)
      }, 200)
    }

    controlsIcon.start(isHovered ? 'hidden' : 'visible')
    controlsLinks.start(isHovered ? 'visible' : 'hidden')
  }, [controlsIcon, isHovered, controlsLinks, isHiddenIcon, mounted, isHiddenLinks, loaded])

  useEffect(() => {
    setVisibleHeaderMobile(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (!mounted || !loaded) return

    width > 768 && setVisibleHeaderMobile(false)
  }, [loaded, mounted, width, setVisibleHeaderMobile])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !loaded) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-light-1 font-bold shadow-md transition-all duration-500 hover:bg-slate-light-3 dark:bg-slate-light-3/10 dark:hover:bg-slate-light-3/20 md:h-12 md:w-12">
        <Spinner className="fill-slate-dark-6 dark:fill-slate-light-3" />
      </div>
    )
  }

  return (
    <motion.div
      whileHover={
        width > 768
          ? {
              width: 450,
              transition: { duration: 0.3 },
            }
          : {}
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => width <= 768 && setVisibleHeaderMobile(!visibleHeaderMobile)}
      className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-sm bg-slate-light-1 font-bold text-slate-dark-6 shadow-md hover:bg-slate-light-3 dark:bg-slate-light-3/10 dark:text-slate-light-3 dark:hover:bg-slate-light-3/20 md:h-12 md:w-12"
    >
      <motion.div
        animate={controlsIcon}
        variants={
          width > 768
            ? {
                visible: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
                hidden: { opacity: 0, transition: { duration: 0.2 } },
              }
            : {}
        }
        initial="visible"
        className={clsx(isHiddenIcon ? (width > 768 ? 'hidden' : 'block') : 'block')}
      >
        {width <= 768 ? (
          <>
            {!visibleHeaderMobile ? (
              <MenuIcon fontSize={width > 768 ? 'large' : 'small'} />
            ) : (
              <CloseIcon fontSize={width > 768 ? 'large' : 'small'} />
            )}
          </>
        ) : (
          <MenuIcon fontSize={width > 768 ? 'large' : 'small'} />
        )}
      </motion.div>

      <NavigationLinks
        isHiddenLinks={isHiddenLinks}
        controlsLinks={controlsLinks}
        className={clsx(
          'hidden h-full w-full flex-row items-center justify-center md:block',
          isHiddenLinks ? 'md:hidden' : 'md:block',
        )}
      />
    </motion.div>
  )
}
