import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ptBrData from './data/pt-br.json'
import enUsData from './data/en-us.json'
import { Language } from './config'
import { Root } from './types'

const resources = {
  'pt-br': {
    translation: ptBrData
  },
  'en-us': {
    translation: enUsData
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: Language.PT_BR,
  fallbackLng: Language.PT_BR,
  interpolation: {
    escapeValue: false
  }
})

type Data = Root

function getData(language: Language): Data {
  switch (language) {
    case Language.PT_BR:
      return ptBrData as Data
    case Language.EN_US:
      return enUsData as Data
    default:
      throw new Error(`Language '${language}' not supported`)
  }
}

export { getData }
