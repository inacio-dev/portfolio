import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootPage from './routes/root'
import i18n from './config'

export default function App() {
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
