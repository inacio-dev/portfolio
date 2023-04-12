import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import IconChange from '../svg/icons/IconChange'
import Logo from '../svg/Logo'
import { HeaderLink } from '../types'
import IconMenu from '../svg/icons/IconMenu'

interface HeaderProps {
  setLanguage: (lang: string) => void
}

export default function Header({ setLanguage }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n, ready } = useTranslation()

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

  if (!ready) return <>'loading translations...'</>

  const links = t('header', { returnObjects: true }) as HeaderLink[]

  return (
    <header className="sticky lg:absolute top-0 z-50 flex lg:flex-row flex-col h-fit w-full items-center justify-center bg-slate-dark-1 py-5 lg:h-[96px]">
      <button
        onClick={goHomePage}
        className="lg:absolute lg:left-60 flex items-center justify-center space-x-3"
      >
        <Logo />
        <span className="text-2xl font-bold uppercase text-slate-light-1">{t('logo-header')}</span>
      </button>

      <div className="lg:absolute lg:right-0 flex h-full w-full lg:w-fit items-center justify-center bg-brand-purple space-x-5 lg:pr-60 lg:pl-10">
        <button className="visible lg:invisible lg:hidden flex">
          <IconMenu />
        </button>

        <div className="group lg:visible invisible hidden lg:flex items-center justify-center rounded-md h-12 text-slate-light-1 transition-all hover:bg-brand-blue-columbia/20 group-hover:transition-all">
          <IconMenu className="group-hover:hidden" />

          {links.map((link, index) => (
            <Link
              to={`/${i18n.language}/${link.name.toLowerCase().normalize()}/`}
              key={index}
              className="hidden group-hover:flex hover:bg-brand-blue-columbia/70 rounded-md justify-center items-center space-x-10 h-full px-5"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          onClick={changeLanguage}
          className="group flex items-center justify-center space-x-3 rounded-md bg-brand-blue-columbia/20 h-12 px-3 text-slate-light-1 transition-all hover:bg-brand-blue-columbia/70 group-hover:transition-all"
        >
          <p className="lg:group-hover:hidden">{t('country')}</p>

          <p className="hidden lg:group-hover:flex">{t('language')}</p>
          <IconChange className="hidden lg:group-hover:flex" />
        </button>
      </div>
    </header>
  )
}
