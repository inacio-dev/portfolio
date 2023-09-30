import { Languages } from '@/src/utils/types'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { language },
}: {
  params: { language: Languages }
}) {
  const t = await getTranslator(language, 'Index')

  try {
    return {
      title: `Inácio Rodrigues | ${t('title')}`,
      description: `${t('description')}`,
      creator: 'Inácio Rodrigues',
    }
  } catch (error) {
    return {
      title: 'Inácio Rodrigues',
      description: '',
      creator: 'Inácio Rodrigues',
    }
  }
}

export default async function Home({ params: { language } }: { params: { language: Languages } }) {
  const t = await getTranslator(language, 'Index')

  return (
    <main className="flex min-h-screen w-full items-center justify-center text-3xl text-slate-dark-1">
      <h1>{t('title')}</h1>
    </main>
  )
}
