import { useTranslation } from 'react-i18next'

interface HeaderProps {
  setLanguage: (lang: string) => void
}

export default function Header({ setLanguage }: HeaderProps) {
  const { t } = useTranslation()
  return (
    <header className="flex">
      <button onClick={() => setLanguage(`en-us`)}>{t('home.text')}</button>
    </header>
  )
}
