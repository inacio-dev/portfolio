import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootPage from './routes/root'

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
