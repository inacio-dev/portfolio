'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'

import Spinner from '../assets/icons/Spinner'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function HeaderLinks() {
  const t = useTranslations('Header.menu')
  const controlsIcon = useAnimation()
  const controlsLinks = useAnimation()
  const { width } = useWindowDimensions()

  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHiddenIcon, setIsHiddenIcon] = useState(false)
  const [isHiddenLinks, setIsHiddenLinks] = useState(true)

  const keys = ['home', 'records', 'about', 'projects', 'terms'] as const

  useEffect(() => {
    if (!mounted) return

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
  }, [controlsIcon, isHovered, controlsLinks, isHiddenIcon, mounted, isHiddenLinks])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || width <= 1280) {
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-slate-light-3/20 text-xl font-medium transition-all duration-500 hover:bg-slate-light-3/40">
        <Spinner className="fill-slate-light-3" />
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{
        width: 550,
        backgroundColor: 'rgb(251 252 253 / 0.2)',
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-sm"
    >
      <motion.div
        animate={controlsIcon}
        variants={{
          visible: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
          hidden: { opacity: 0, transition: { duration: 0.2 } },
        }}
        initial="visible"
        className={clsx(isHiddenIcon ? 'hidden' : 'block')}
      >
        <MenuIcon fontSize="large" className="text-slate-dark-6 dark:text-slate-light-3" />
      </motion.div>

      <nav
        className={clsx(
          'flex h-full w-full flex-row items-center justify-center',
          isHiddenLinks ? 'hidden' : 'block',
        )}
      >
        <motion.ul
          animate={controlsLinks}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 0.2, delay: 0.2 },
            },
            hidden: {
              opacity: 0,
              transition: { duration: 0.2 },
            },
          }}
          initial="hidden"
          className={clsx(
            'flex h-full w-full flex-row items-center justify-center',
            isHiddenLinks ? 'hidden' : 'block',
          )}
        >
          {keys.map((key, index) => (
            <li key={index} className="h-full">
              <Link
                href={
                  key !== 'home'
                    ? '/' +
                      t(key)
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(' e ', '-')
                        .replace(' and ', '-')
                        .toLowerCase()
                    : '/'
                }
                className="flex h-full items-center justify-center px-5 transition-all duration-300 hover:bg-slate-light-1/20 focus:bg-slate-light-1/20"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </motion.ul>
      </nav>
    </motion.div>
  )
}
