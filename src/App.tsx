import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import RootPage from './routes/root'

export default function App() {
  const { i18n } = useTranslation()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:lang/*"
          element={
            <RootPage
              setLanguage={(lang: string) => {
                i18n.changeLanguage(lang)
              }}
            />
          }
        />
        <Route
          path="/"
          element={
            <RootPage
              setLanguage={(lang: string) => {
                i18n.changeLanguage(lang)
              }}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
