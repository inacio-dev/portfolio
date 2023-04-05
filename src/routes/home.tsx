import { useContext } from 'react'
import { getData } from '../data'
import { LanguageContext } from '../LanguageContext'
import { Home, Information } from '../types'

export default function HomePage() {
  const data = getData(useContext(LanguageContext).language) as unknown as Home

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div>
        <h1>{data.text}</h1>
        <p>{data.contact}</p>
        <p>{data.tour}</p>
        {data.informations.map((info: Information) => (
          <div key={info.id}>
            <h2>{info.title}</h2>
            <p>{info.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
