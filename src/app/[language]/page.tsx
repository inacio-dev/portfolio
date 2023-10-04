import { LinkToUrl } from '@/src/components/LinkToUrl'
import MainSection from '@/src/components/MainSection'
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
    <MainSection>
      <div className="relative grid min-h-[calc(100vh-192px)] w-full items-center justify-center space-y-10 overflow-hidden px-8 pb-4 lg:min-h-[calc(100vh-112px)] lg:justify-start lg:space-y-0 lg:px-[12vw] lg:pb-0">
        {/* <HeroIndex /> */}

        <div className="z-10 space-y-14">
          <div className="max-w-none space-y-6 text-slate-dark-1 transition-colors duration-100 dark:text-slate-light-1 lg:max-w-xl">
            <h1 className="text-6xl font-bold uppercase lg:text-8xl">Inácio Rodrigues</h1>
            <p className="text-lg lg:text-xl">{t('about')}</p>
          </div>

          <LinkToUrl.Root
            href={{ pathname: '/about' }}
            background="brand"
            className="h-14 w-full lg:w-56"
          >
            <LinkToUrl.Label>{t('aboutButton')}</LinkToUrl.Label>
          </LinkToUrl.Root>
        </div>
      </div>
    </MainSection>
  )
}
