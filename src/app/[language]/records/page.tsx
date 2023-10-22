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

  if (!view || !['resume', 'ongoing'].includes(view)) {
    return (
      <MainSection>
        <QueryRecordsEffect view={view} />

        <Spinner className="h-20 w-20 fill-slate-dark-6 transition-all duration-500 dark:fill-slate-light-3" />
      </MainSection>
    )
  }

  const pursuits = ['freelancer', 'ufc', 'cs50'] as const

  const contents = ['professionals', 'academics', 'additionals'] as const
  const professionals = ['freelancer', 'apeu'] as const
  const academics = ['ufc', 'school'] as const
  const additionals = [
    'certiprof',
    'ebmd',
    'cs50',
    'scrum',
    'adv-english',
    'inter-english',
    'iot',
    'logic',
    'adobe',
  ] as const

  return (
    <MainSection className="pb-16 text-start md:pb-28 ">
      <QueryRecordsEffect view={view} />

      {view === 'ongoing' || view === 'atualmente' ? (
        <>
          <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">
            {t('page-title')}
          </h1>

          <ul className="space-y-6">
            {pursuits.map((pursuit, index) => (
              <li key={index}>
                <p className="text-xs uppercase md:text-sm">{t(`pursuits.${pursuit}.date`)}</p>
                <h2 className="font-bold uppercase">{t(`pursuits.${pursuit}.title`)}</h2>
                <p>{t(`pursuits.${pursuit}.description`)}</p>

                {index === 1 && (
                  <ul className="ml-8 list-disc md:ml-12">
                    {[...Array(3)].map((_item, index) => (
                      <li key={index}>{t(`pursuits.${pursuit}.list.l${index}`)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">
            {t('page-title')}
          </h1>

          <ul className="w-full space-y-14">
            {contents.map((content, index) => (
              <li key={index}>
                <h2 className="text-xl font-bold">{t(`contents.${content}.title`)}</h2>

                {index === 0 && (
                  <ul className="mt-6 space-y-6">
                    {professionals.map((professional, index) => (
                      <li key={index}>
                        <p className="text-xs uppercase md:text-sm">
                          {t(`contents.professionals.${professional}.date`)}
                        </p>
                        <h2 className="font-bold uppercase">
                          {t(`contents.professionals.${professional}.title`)}
                        </h2>
                        <p>{t(`contents.professionals.${professional}.description`)}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {index === 1 && (
                  <ul className="mt-6 space-y-6">
                    {academics.map((academic, index) => (
                      <li key={index}>
                        <p className="text-xs uppercase md:text-sm">
                          {t(`contents.academics.${academic}.date`)}
                        </p>
                        <h2 className="font-bold uppercase">
                          {t(`contents.academics.${academic}.title`)}
                        </h2>
                        <p>{t(`contents.academics.${academic}.description`)}</p>

                        {index === 0 && (
                          <ul className="ml-8 list-disc md:ml-12">
                            {[...Array(3)].map((_item, index) => (
                              <li key={index}>
                                {t(`contents.academics.${academic}.list.l${index}`)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {index === 2 && (
                  <ul className="mt-6 space-y-6">
                    {additionals.map((additional, index) => (
                      <li key={index}>
                        <p className="text-xs uppercase md:text-sm">
                          {t(`contents.additionals.${additional}.date`)}
                        </p>
                        <h2 className="font-bold uppercase">
                          {t(`contents.additionals.${additional}.title`)}
                        </h2>
                        <p>{t(`contents.additionals.${additional}.description`)}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </MainSection>
  )
}
