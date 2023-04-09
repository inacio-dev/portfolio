import { useTranslation } from 'react-i18next'

interface HeaderProps {
  setLanguage: (lang: string) => void
}

export default function Header({ setLanguage }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 flex h-fit flex-col items-center justify-center bg-slate-dark-1 py-5 text-slate-light-1 lg:h-[96px]">
      <button onClick={() => setLanguage('en')}>{t('home.text')}</button>
    </header>
  )
}
