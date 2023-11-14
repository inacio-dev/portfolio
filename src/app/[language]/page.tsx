import HeroIndex from '@/src/components/HeroIndex'
import { LinkToUrl } from '@/src/components/LinkToUrl'
import MainSection from '@/src/components/MainSection'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('Home')
  const creator = 'Inácio Rodrigues'

  try {
    const title = `${creator} | ${t('title')}`
    const description = t('description')
    return { title, description, creator }
  } catch (error) {
    return { title: creator, description: '', creator }
  }
}

export default async function Home() {
  const t = await getTranslations('Home')

  return (
    <MainSection className="items-start">
      <HeroIndex />

      <div className="z-10 space-y-14">
        <div className="max-w-none space-y-6 rounded-none bg-transparent text-slate-dark-6 transition-colors duration-100 dark:text-slate-light-3 sm:max-w-xl sm:rounded-2xl sm:bg-slate-light-3/60 dark:sm:bg-slate-dark-2/60">
          <h1 className="text-5xl font-bold uppercase sm:text-8xl">Inácio Rodrigues</h1>
          <p className="text-sm uppercase sm:text-base">{t('about')}</p>
        </div>

        <LinkToUrl.Root
          href={{ pathname: '/about' }}
          background="brand"
          className="h-14 w-full sm:w-56"
        >
          <LinkToUrl.Label>{t('button')}</LinkToUrl.Label>
        </LinkToUrl.Root>
      </div>
    </MainSection>
  )
}
