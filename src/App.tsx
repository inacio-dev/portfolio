import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootPage from './routes/root'
import i18n from './config'
import HomePage from './routes/home'
import HistoryPage from './routes/history'
import Loading from './components/Loading'
import AboutPage from './routes/about'
import PoliciesPage from './routes/terms-policies'
import ProjectsPage from './routes/projects'
import ProjectPage from './routes/project'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<RootPage setLanguage={i18n.changeLanguage} />}>
            <Route index element={<Navigate to="/pt/" />} />

            <Route path="/:lang/">
              <Route index element={<HomePage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="terms-policies" element={<PoliciesPage />} />

              <Route path="projects">
                <Route index element={<ProjectsPage />} />
                <Route path=":id/" element={<ProjectPage />} />
              </Route>

              <Route path="loading" element={<Loading />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}
