import ptBrData from './data/pt-br.json'
import enUsData from './data/en-us.json'
import { Language } from './config'
import { Root } from './types'

type Data = Root

let ptBrInitialData = ptBrData as Data
let enUsInitialData = enUsData as Data

function getData(language: Language): Data {
  switch (language) {
    case 'pt-br':
      return ptBrInitialData
    case 'en-us':
      return enUsInitialData
    default:
      throw new Error(`Language '${language}' not supported`)
  }
}

export { getData }
