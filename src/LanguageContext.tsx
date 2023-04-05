import React, { createContext, useContext, useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import ptBrData from './data/pt-br.json'
import enUsData from './data/en-us.json'
import { Language } from './config'

// Configuração da biblioteca i18next
i18n.use(initReactI18next).init({
  resources: {
    'pt-br': { translation: ptBrData },
    'en-us': { translation: enUsData }
  },
  lng: Language.PT_BR,
  fallbackLng: Language.PT_BR,
  interpolation: { escapeValue: false }
})

type LanguageContextData = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextData>({
  language: Language.PT_BR,
  setLanguage: () => {}
})

export function useLanguage(): LanguageContextData {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within an LanguageProvider')
  }
  return context
}

type LanguageProviderProps = {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps): JSX.Element {
  const { i18n } = useTranslation()

  useEffect(() => {
    const language = localStorage.getItem('language') as Language
    if (language) {
      i18n.changeLanguage(language)
    }
  }, [i18n])

  function setLanguage(language: Language) {
    localStorage.setItem('language', language)
    i18n.changeLanguage(language)
  }

  return (
    <LanguageContext.Provider value={{ language: i18n.language as Language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
