import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

interface HeaderProps {
  setLanguage: (lang: string) => void
}

export default function RootPage({ setLanguage }: HeaderProps) {
  return (
    <>
      <Header setLanguage={setLanguage} />
      <Outlet />
    </>
  )
}
