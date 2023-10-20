import Image from 'next/image'
import NextLogo from '@/src/assets/Next'
import TailwindLogo from '@/src/assets/Tailwind'
import MainSection from '@/src/components/MainSection'
import ProjectSection from '@/src/components/ProjectSection'
import { Languages } from '@/src/utils/types'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { language },
}: {
  params: { language: Languages }
}) {
  const t = await getTranslator(language, 'Projects')
  const creator = 'Inácio Rodrigues'

  try {
    const title = `${creator} | ${t('title')}`
    const description = t('description')
    return { title, description, creator }
  } catch (error) {
    return { title: creator, description: '', creator }
  }
}

export default async function Projects({
  params: { language },
}: {
  params: { language: Languages }
}) {
  const t = await getTranslator(language, 'Projects')

  let homePageImg = (await import('@/public/home-page.png')).default

  return (
    <MainSection className="px-0 sm:px-0 md:px-0 xl:px-0">
      <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">{t('title')}</h1>

      <ProjectSection id="website">
        <h2 className="pb-10 text-xl font-bold uppercase">{t('website.title')}</h2>

        <div className="space-y-4">
          {[...Array(4)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index}`)}</p>
          ))}

          <div className="flex flex-col space-y-10 py-10">
            <div className="flex flex-row items-center justify-center space-x-10 fill-slate-dark-6 dark:fill-slate-light-3">
              <NextLogo />
              <TailwindLogo />
            </div>

            <div className="relative flex h-48 w-full items-center justify-center overflow-hidden">
              <Image
                src={homePageImg}
                alt="home-page"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {[...Array(3)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index + 4}`)}</p>
          ))}
        </div>
      </ProjectSection>
    </MainSection>
  )
}
