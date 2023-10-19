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

  return (
    <MainSection className="px-0 sm:px-0 md:px-0 xl:px-0">
      <ProjectSection id="website">{t('title')}</ProjectSection>
    </MainSection>
  )
}
