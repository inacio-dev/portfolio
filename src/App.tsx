import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './routes/home'
import RootPage from './routes/root'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
