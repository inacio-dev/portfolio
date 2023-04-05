import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'
import { Header } from '../types'

export default function HeaderBar() {
  const headerData = useContext(LanguageContext).header as Header[]

  return (
    <nav>
      <ul>
        {headerData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </nav>
  )
}
