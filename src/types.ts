export interface Root {
  language: string
  country: string
  'logo-header': string
  header: Header[]
  home: Home
  about: About
  terms: Terms
  history: History
}

export interface Header {
  id: number
  name: string
}

export interface Home {
  text: string
  contact: string
  tour: string
  informations: Information[]
}

export interface Information {
  id: number
  title: string
  text: string
}

export interface About {
  title: string
  texts: string[]
  'contact-title': string
}

export interface Terms {
  title: string
  header: string
  texts: Text[]
  footer: string
}

export interface Text {
  'sub-title': string
  paragraphs: string[]
}

export interface History {
  'short-title': string
  button: string
  'back-button': string
  'download-button': string
  titles: Title[]
  informations: Information2[]
}

export interface Title {
  id: number
  title: string
}

export interface Information2 {
  title: number
  presently: boolean
  link?: string
  time: string
  name: string
  paragraphs: string[]
}
