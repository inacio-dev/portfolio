'use client'

import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import LanguageIcon from '@mui/icons-material/Language'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'

import FrontendMentorLogo from '../assets/FrontendMentorLogo'
import useLocalStorage from '../hooks/useLocalStorage'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { usePathname } from '../navigation'
import scrollTo from '../utils/scrollTo'

const historyNav = [
  {
    key: 'website',
    icon: <WebAssetIcon fontSize="small" />,
  },
  {
    key: 'frontend',
    icon: <FrontendMentorLogo className="transition-colors duration-500" />,
  },
  {
    key: 'sites',
    icon: <LanguageIcon fontSize="small" />,
  },
]

export default function AsideMenu() {
  const pathname = usePathname()
  const t = useTranslations('Aside')
  const { width } = useWindowDimensions()
  const controlsAside = useAnimation()
  const controlsIconOpen = useAnimation()
  const controlsIconClose = useAnimation()

  const [visibleMenu, setVisibleMenu] = useLocalStorage('aside-menu', false)

  const [openSideInfo, setOpenSideInfo] = useState(false)
  const [disabledButton] = useState(openSideInfo)
  const [isHiddenIconOpen, setIsHiddenIconOpen] = useState(false)
  const [isHiddenIconClose, setIsHiddenIconClose] = useState(true)

  useEffect(() => {
    setVisibleMenu(pathname.includes('/projects'))
  }, [pathname, setVisibleMenu])

  useEffect(() => {
    setTimeout(() => {
      !visibleMenu ? controlsAside.start('hide') : controlsAside.start('show')
      setOpenSideInfo(false)
    }, 200)
  }, [controlsAside, visibleMenu])

  useEffect(() => {
    if (width <= 1279) {
      setTimeout(() => {
        if (openSideInfo) {
          setIsHiddenIconOpen(true)
          setIsHiddenIconClose(false)
        } else {
          setIsHiddenIconOpen(false)
          setIsHiddenIconClose(true)
        }
      }, 200)

      controlsIconOpen.start(openSideInfo ? 'hidden' : 'visible')
      controlsIconClose.start(openSideInfo ? 'visible' : 'hidden')
    } else {
      controlsIconOpen.start('visible')
      controlsIconClose.start('hidden')
    }

    openSideInfo ? controlsAside.start('open') : visibleMenu && controlsAside.start('show')
  }, [controlsAside, controlsIconClose, controlsIconOpen, openSideInfo, visibleMenu, width])

  useEffect(() => {
    width > 1279 && setOpenSideInfo(false)
  }, [setOpenSideInfo, width])

  return (
    <motion.aside
      animate={controlsAside}
      whileHover={
        visibleMenu &&
        width > 1279 && {
          width: 400,
          transition: { duration: 0.2 },
        }
      }
      variants={{
        hide: {
          width: 0,
          transition: { duration: 0.4 },
        },
        show: { width: 50, transition: { duration: 0.4 } },
        open: { width: 300, transition: { duration: 0.3 } },
      }}
      initial={visibleMenu ? 'show' : 'hide'}
      className="sticky right-0 top-0 z-40 flex min-h-screen overflow-hidden bg-brand-mindaro pt-16 text-slate-light-3 shadow-xl transition-all duration-500 dark:bg-brand-indigo lg:pt-28"
    >
      <nav className="fixed w-full">
        <ul className="ml-1 flex w-full flex-col items-start justify-start space-y-2">
          <li className="block w-full lg:hidden">
            <button
              disabled={disabledButton}
              onClick={() => setOpenSideInfo(!openSideInfo)}
              className={clsx(
                'flex h-12 w-full flex-row items-center justify-start rounded-l-sm fill-slate-dark-6 pl-2 text-slate-dark-6 shadow-lg transition-all duration-500 dark:fill-slate-light-3 dark:text-slate-light-3',
                openSideInfo
                  ? 'bg-slate-light-3 dark:bg-slate-light-3/40'
                  : 'bg-slate-light-1 dark:bg-slate-light-3/10',
              )}
            >
              <motion.div
                animate={controlsIconOpen}
                variants={{
                  visible: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
                  hidden: { opacity: 0, transition: { duration: 0.2 } },
                }}
                initial="visible"
                className={clsx(isHiddenIconOpen ? 'hidden' : 'block')}
              >
                <MenuOpenIcon fontSize="small" />
              </motion.div>

              <motion.div
                animate={controlsIconClose}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.2, delay: 0.3 },
                  },
                  hidden: {
                    opacity: 0,
                    transition: { duration: 0.2 },
                  },
                }}
                initial="hidden"
                className={clsx(isHiddenIconClose ? 'hidden' : 'block')}
              >
                <CloseIcon fontSize="small" />
              </motion.div>

              <span className="ml-4">{t('menu-mobile')}</span>
            </button>
          </li>

          {historyNav.slice(0, 6).map((nav, index) => (
            <li key={index} className="w-full">
              <button
                disabled={disabledButton}
                onClick={() => scrollTo(nav.key)}
                className="flex h-12 w-full flex-row items-center justify-start rounded-l-sm bg-slate-light-1 fill-slate-dark-6 pl-2 text-slate-dark-6 shadow-lg transition-all duration-500 hover:bg-inherit dark:bg-slate-light-3/10 dark:fill-slate-light-3 dark:text-slate-light-3 dark:hover:bg-inherit lg:hover:bg-slate-light-3 lg:dark:hover:bg-slate-light-3/40"
              >
                {nav.icon}
                <span className="ml-4">{t(nav.key)}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  )
}
