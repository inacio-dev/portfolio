import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBrData from './data/pt-br.json'
import enUsData from './data/en-us.json'

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBrData },
    'en-US': { translation: enUsData }
  },
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false
  },
  debug: true
})

export default i18n
