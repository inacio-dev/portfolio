import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBrData from './data/pt-br.json'
import enUsData from './data/en-us.json'

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: ptBrData },
    en: { translation: enUsData }
  },
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false
  },
  debug: false
})

export default i18n
