import ptBrData from './data/pt-br.json'
import enUsData from './data/en-us.json'
import { Language } from './config'
import { Root } from './types'

type Data = Root

let ptBrInitialData: Data = {} as Data
let enUsInitialData: Data = {} as Data

function getData(language: Language): Data {
  switch (language) {
    case 'pt-br':
      ptBrInitialData = ptBrData as Data
      return ptBrInitialData
    case 'en-us':
      enUsInitialData = enUsData as Data
      return enUsInitialData
    default:
      throw new Error(`Language '${language}' not supported`)
  }
}

export { getData }
