import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'
import { Terms } from '../types'
import ContentPage from '../components/ContentPage'

export default function PoliciesPage() {
  const { t, ready } = useTranslation()

  if (!ready) return <Loading />

  const terms = t('terms', { returnObjects: true }) as Terms

  return (
    <ContentPage>
      <h1 className="text-left text-2xl font-bold lg:text-4xl">{terms.title}</h1>
      <p className="text-left text-lg font-medium lg:text-lg">{terms.header}</p>

      <ul className="space-y-10">
        {terms.texts.map((text, index) => (
          <li key={index} className="space-y-3">
            <h2 className="text-left text-lg font-medium lg:text-lg">{text['sub-title']}</h2>

            <ul className="ml-6 space-y-3">
              {text.paragraphs.map((parag, index) => (
                <li key={index}>{parag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <span className="pt-10 pb-14">*** {terms.footer}</span>
    </ContentPage>
  )
}
