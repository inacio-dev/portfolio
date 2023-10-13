import Spinner from '@/src/assets/Spinner'
import MainSection from '@/src/components/MainSection'
import QueryRecordsEffect from '@/src/components/QueryRecordsEffect'
import { Languages } from '@/src/utils/types'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { language },
  searchParams,
}: {
  params: { language: Languages }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const creator = 'Inácio Rodrigues'
  const view = searchParams.view as string

  const t = await getTranslator(language, `Records`)

  try {
    const title = `${creator} | ${t('title')} | ${t(view + '.title')}`
    const description = t(view + '.description')
    return { title, description, creator }
  } catch (error) {
    return { title: creator, description: '', creator }
  }
}

export default async function Records({
  params: { language },
  searchParams,
}: {
  params: { language: Languages }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const view = searchParams.view as string | undefined

  const t = await getTranslator(language, `Records.${view}`)

  if (!view) {
    return (
      <MainSection>
        <QueryRecordsEffect view={view} />

        <Spinner className="h-20 w-20 fill-slate-dark-6 transition-all duration-500 dark:fill-slate-light-3" />
      </MainSection>
    )
  }

  return (
    <MainSection className="text-start text-xs md:text-base">
      <QueryRecordsEffect view={view} />

      {view === 'ongoing' ? (
        <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">{t('page-title')}</h1>
      ) : (
        <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">{t('page-title')}</h1>
      )}
    </MainSection>
  )
}
