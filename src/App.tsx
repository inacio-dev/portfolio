import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './routes/home'
import RootPage from './routes/root'
import { LanguageProvider } from './LanguageContext'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/*" element={<RootPage />} />
        <Route path="/" element={<RootPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
