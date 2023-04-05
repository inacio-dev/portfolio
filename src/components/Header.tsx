import { useContext } from 'react'
import { Language, LanguageContext } from '../LanguageContext'

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext)

  function handleLanguageChange(newLanguage: Language) {
    setLanguage(newLanguage)
  }

  return (
    <header className="sticky z-50 w-full bg-brand-red/60 p-3 transition-all duration-200">
      <button
        onClick={() => handleLanguageChange('pt-br')}
        className={`mr-2 ${language === 'pt-br' ? 'bg-brand-red' : ''}`}
        disabled={language === 'pt-br'}
      >
        PT-BR
      </button>
      <button
        onClick={() => handleLanguageChange('en-us')}
        className={`${language === 'en-us' ? 'bg-brand-red' : ''}`}
        disabled={language === 'en-us'}
      >
        EN-US
      </button>
      <p>Current language: {language}</p>
    </header>
  )
}
