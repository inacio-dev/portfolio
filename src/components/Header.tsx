import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import IconChange from '../svg/icons/IconChange'
import Logo from '../svg/Logo'
import { HeaderLink } from '../types'
import IconMenu from '../svg/icons/IconMenu'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Loading from './Loading'
import { motion } from 'framer-motion'

interface HeaderProps {
  setLanguage: (lang: string) => void
}

export default function Header({ setLanguage }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n, ready } = useTranslation()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const path = location.pathname

  function changeLanguage() {
    if (i18n.language === 'pt') {
      navigate(location.pathname.replace('pt', 'en'), { replace: true })
      setLanguage('en')
    } else {
      navigate(location.pathname.replace('en', 'pt'), { replace: true })
      setLanguage('pt')
    }
  }

  function goHomePage() {
    navigate(`/${i18n.language}/`, { replace: true })
  }

  function setPage(link: string, index: number) {
    if (index === 0) return `/${i18n.language}/`
    return `/${i18n.language}/${link}`
  }

  useEffect(() => {
    setShowMenu(false)
  }, [path])

  if (!ready) return <Loading />

  const links = t('header', { returnObjects: true }) as HeaderLink[]

  return (
    <header
      id="header"
      className="fixed top-0 z-50 flex h-fit w-full flex-col items-center justify-center bg-slate-dark-1 transition-all lg:h-[96px] lg:flex-row lg:py-5"
    >
      <button
        onClick={goHomePage}
        className="my-5 flex items-center justify-center space-x-3 lg:absolute lg:left-[15%] lg:my-0"
      >
        <Logo />
        <span className="text-2xl font-bold uppercase text-slate-light-1">{t('logo-header')}</span>
      </button>

      <div className="flex h-fit w-full items-center justify-center space-x-5 bg-brand-purple py-2 pl-0 pr-[0%] transition-all lg:absolute lg:right-0 lg:h-full lg:w-fit lg:py-0 lg:pr-[15%] lg:pl-10">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={clsx(
            'visible flex h-12 w-12 items-center justify-center rounded-sm transition-all lg:invisible lg:hidden',
            showMenu && 'bg-brand-blue-columbia/20'
          )}
        >
          <IconMenu />
        </button>

        <motion.div
          whileHover={{
            width: 540,
            transition: { duration: 0.2 }
          }}
          className="group invisible hidden h-12 w-10 items-center justify-center rounded-sm text-slate-light-1 transition-all hover:bg-brand-blue-columbia/20 group-hover:transition-all lg:visible lg:flex"
        >
          <IconMenu className="group-hover:hidden" />

          {links.map((link, index) => (
            <Link
              to={setPage(link.link, index)}
              key={index}
              className={clsx(
                'hidden h-full items-center justify-center space-x-10 rounded-sm px-5 hover:bg-brand-blue-columbia/70 group-hover:flex group-hover:animate-tooltip_show',
                path.includes(link.link) && 'bg-brand-blue-columbia/20',
                path === `/${i18n.language}/` && index === 0 && 'bg-brand-blue-columbia/20'
              )}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>

        <button onClick={changeLanguage}>
          <motion.div
            whileHover={{
              width: 150,
              transition: { duration: 0.2 }
            }}
            className="group flex h-12 w-14 items-center justify-center space-x-3 rounded-sm bg-brand-blue-columbia/20 px-3 text-slate-light-1 transition-all hover:bg-brand-blue-columbia/70 group-hover:transition-all"
          >
            <p className="lg:group-hover:hidden">{t('country')}</p>

            <p className="hidden group-hover:animate-tooltip_show lg:group-hover:flex">
              {t('language')}
            </p>
            <IconChange className="hidden group-hover:animate-tooltip_show lg:group-hover:flex" />
          </motion.div>
        </button>
      </div>

      {showMenu && (
        <div className="visible grid h-fit w-full grid-cols-2 items-center justify-center bg-brand-purple py-3 lg:invisible lg:hidden">
          {links.map((link, index) => (
            <Link
              to={setPage(link.link, index)}
              key={index}
              className={clsx(
                'flex items-center justify-center rounded-sm py-2 text-slate-light-1 transition-all',
                path.includes(link.link) && 'bg-brand-blue-columbia/20',
                path === `/${i18n.language}/` && index === 0 && 'bg-brand-blue-columbia/20'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
