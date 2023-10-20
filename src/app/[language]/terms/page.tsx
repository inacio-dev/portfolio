import MainSection from '@/src/components/MainSection'
import { Languages } from '@/src/utils/types'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { language },
}: {
  params: { language: Languages }
}) {
  const t = await getTranslator(language, 'Terms')
  const creator = 'Inácio Rodrigues'

  try {
    const title = `${creator} | ${t('title')}`
    const description = t('description')
    return { title, description, creator }
  } catch (error) {
    return { title: creator, description: '', creator }
  }
}

export default async function Terms({ params: { language } }: { params: { language: Languages } }) {
  const t = await getTranslator(language, 'Terms')

  const topics = ['terms', 'policies'] as const

  return (
    <MainSection className="text-start">
      <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">{t('page-title')}</h1>

      <p>{t('page-description')}</p>

      <ul className="space-y-10">
        {topics.map((topic, index) => (
          <li key={index} className="space-y-2">
            <h2 className="font-bold">{t(`${topic}.title`)}</h2>

            <ol className="ml-6 list-decimal md:ml-10">
              {[...Array(index === 0 ? 3 : 4)].map((_paragraph, index) => (
                <li key={index}>{t(`${topic}.list.l${index}`)}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>

      <p className="text-xs md:text-sm">*** {t('footer')}</p>
    </MainSection>
  )
}
