import { createContext, useState } from 'react'
import { config, Language } from './config'

export interface LanguageContextType {
  language: Language
  setLanguage: (newLanguage: Language) => void
}

export const LanguageContext = createContext<LanguageContextType>({
  language: config.defaultLanguage as Language,
  setLanguage: () => {}
})

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(config.defaultLanguage as Language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
export type { Language }
