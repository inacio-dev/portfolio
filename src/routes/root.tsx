import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

interface RootPageProps {
  setLanguage: (lang: string) => void
}

export default function RootPage({ setLanguage }: RootPageProps) {
  const { i18n } = useTranslation()
  /*   const navigate = useNavigate()
  const location = useLocation() */

  useEffect(() => {
    const lang = window.location.pathname.split('/')[1]
    if (lang !== i18n.language) {
      setLanguage(lang)
    }
  }, [])

  return (
    <>
      <Header setLanguage={setLanguage} />
      <Outlet />
    </>
  )
}
