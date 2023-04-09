import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootPage from './routes/root'
import i18n from './config'
import HomePage from './routes/home'
import HistoryPage from './routes/history'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage setLanguage={i18n.changeLanguage} />}>
          <Route index element={<Navigate to="/pt/" />} />
          <Route path="/:lang/">
            <Route index element={<HomePage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
