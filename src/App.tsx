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
            {['histórico', 'historic'].map((path, index) => (
              <Route key={index} path={path} element={<HistoryPage />} />
            ))}

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
