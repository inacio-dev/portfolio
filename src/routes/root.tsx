import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'

interface RootPageProps {
  setLanguage: (lang: string) => void
}

export default function RootPage({ setLanguage }: RootPageProps) {
  const { i18n } = useTranslation()
  const { lang } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      if (!['pt', 'en'].includes(lang)) {
        navigate('/pt/', { replace: true })
      }
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
