import { Languages } from '@/src/utils/types'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { language },
}: {
  params: { language: Languages }
}) {
  const t = await getTranslator(language, 'Home')
  const creator = 'Inácio Rodrigues'

  try {
    const title = `${creator} | ${t('title')}`
    const description = t('description')
    return { title, description, creator }
  } catch (error) {
    return { title: creator, description: '', creator }
  }
}

export default async function Home({ params: { language } }: { params: { language: Languages } }) {
  const t = await getTranslator(language, 'Home')

  return (
    <main className="flex min-h-screen w-full items-center justify-center text-3xl text-slate-dark-1">
      <h1>{t('title')}</h1>
    </main>
  )
}
