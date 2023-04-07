import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootPage from './routes/root'
import i18n from './config'
import HomePage from './routes/home'

export default function App() {
  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/*" element={<RootPage setLanguage={i18n.changeLanguage} />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/" element={<Navigate to={`/${i18n.language}/`} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
