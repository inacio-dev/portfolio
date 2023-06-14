import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import AnimatedPage from '../components/AnimatedPage'

interface RootPageProps {
  setLanguage: (lang: string) => void
}

export default function RootPage({ setLanguage }: RootPageProps) {
  const { i18n } = useTranslation()
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [homePageKey, setHomePageKey] = useState<number>(0)

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      if (!['pt', 'en'].includes(lang)) {
        navigate('/pt/', { replace: true })
      }
      setLanguage(lang)
    }
  }, [lang])

  useEffect(() => {
    if (location.pathname === '/') {
      setHomePageKey((prevKey) => prevKey + 1)
    }
  }, [location])

  return (
    <>
      <Header setLanguage={setLanguage} />
      <AnimatedPage>
        <Outlet key={homePageKey} />
      </AnimatedPage>
    </>
  )
}
