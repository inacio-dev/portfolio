import { createContext, ReactNode, useContext, useState } from 'react'
import ptBrData from './data/pt-br.json'
import enUsData from './data/en-us.json'
import { Language } from './config'
import { Root } from './types'

type Data = Root

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  data: Data
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-br',
  setLanguage: () => {},
  data: ptBrData
})

function getData(language: Language): Data {
  switch (language) {
    case 'pt-br':
      return ptBrData
    case 'en-us':
      return enUsData
    default:
      throw new Error(`Language '${language}' not supported`)
  }
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-br')
  const data = getData(language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data }}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext)
  return { language, setLanguage }
}

export { LanguageProvider, useLanguage }
export type { Language }
