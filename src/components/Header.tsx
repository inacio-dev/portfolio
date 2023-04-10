import { link } from 'fs'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconChange from '../svg/icons/IconChange'
import Logo from '../svg/Logo'
import { Data, HeaderLink } from '../types'

interface HeaderProps {
  setLanguage: (lang: string) => void
}

export default function Header({ setLanguage }: HeaderProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { i18n } = useTranslation()

  const links = t('header') as unknown as HeaderLink[]

  function changeLanguage() {
    if (i18n.language === 'pt') {
      navigate(location.pathname.replace('pt', 'en'), { replace: true })
      setLanguage('en')
    } else {
      navigate(location.pathname.replace('en', 'pt'), { replace: true })
      setLanguage('pt')
    }
  }

  return (
    <header className="absolute top-0 z-50 flex h-fit w-full items-center justify-center bg-slate-dark-1 py-5 lg:h-[96px]">
      <div className="absolute left-60 flex items-center justify-center space-x-3">
        <Logo />
        <span className="text-2xl font-bold uppercase text-slate-light-1">{t('logo-header')}</span>
      </div>
      <div className="absolute right-0 flex h-full w-fit items-center justify-center bg-brand-purple px-10">
        <div>
          {links.map((link) => {
            return <p>{link.name}</p>
          })}
        </div>
        <button
          onClick={changeLanguage}
          className="group mr-60 flex items-center justify-center space-x-3 rounded-md bg-brand-blue-columbia/20 p-3 text-slate-light-1 transition-all hover:bg-brand-blue-columbia/70 group-hover:transition-all"
        >
          <p className="group-hover:hidden">{t('country')}</p>
          <p className="hidden group-hover:flex">{t('language')}</p>
          <IconChange className="hidden group-hover:flex" />
        </button>
      </div>
    </header>
  )
}
