import AstroLogo from '@/src/assets/Astro'
import FigmaLogo from '@/src/assets/Figma'
import FrontendMentorLogo from '@/src/assets/FrontendMentor'
import NextLogo from '@/src/assets/Next'
import TailwindLogo from '@/src/assets/Tailwind'
import MainSection from '@/src/components/MainSection'
import ProjectImage from '@/src/components/ProjectImage'
import ProjectLink from '@/src/components/ProjectLink'
import ProjectSection from '@/src/components/ProjectSection'
import { Languages } from '@/src/utils/types'
import GitHubIcon from '@mui/icons-material/GitHub'
import PreviewIcon from '@mui/icons-material/Preview'
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
  let googleTagImg = (await import('@/public/google-tag-manager.png')).default
  let respWebsiteImg = (await import('@/public/responsive-website.png')).default
  let ciWebsiteImg = (await import('@/public/website-cd-ci.png')).default
  let coffeeSiteImg = (await import('@/public/coffee-site.png')).default
  let curcualmImg = (await import('@/public/curcucalm.png')).default

  return (
    <MainSection className="px-0 sm:px-0 md:px-0 xl:px-0">
      <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">{t('title')}</h1>

      <ProjectSection id="website">
        <h2 className="pb-10 text-xl font-bold uppercase">{t('website.title')}</h2>

        <div className="space-y-4">
          {[...Array(4)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index}`)}</p>
          ))}

          <div className="flex flex-row items-center justify-center space-x-10 fill-slate-dark-6 py-10 dark:fill-slate-light-3">
            <NextLogo className="h-auto w-32 md:w-auto" />
            <TailwindLogo className="h-auto w-14 md:w-auto" />
          </div>

          <ProjectImage src={homePageImg} alt="home-page" />

          {[...Array(3)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index + 4}`)}</p>
          ))}

          <ProjectLink
            content_id="F_Website"
            href="https://www.figma.com/file/9uD7fJW0ywgmwxfmJAbmBN/Portfolio?type=design&node-id=56%3A139&mode=design&t=8Y7kq6Xxiomv08kR-1"
          >
            <FigmaLogo className="mr-3 h-8 w-auto" />
            Figma Link
          </ProjectLink>

          {[...Array(2)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index + 7}`)}</p>
          ))}

          <ProjectImage src={googleTagImg} alt="google-tag-manager" />

          {[...Array(4)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index + 9}`)}</p>
          ))}

          <ProjectImage src={respWebsiteImg} alt="google-tag-manager" />

          {[...Array(3)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index + 13}`)}</p>
          ))}

          <ProjectLink content_id="G_Website" href="https://github.com/inacio-dev/portfolio">
            <GitHubIcon className="mr-3 h-8 w-auto" />
            Github Link
          </ProjectLink>

          {[...Array(5)].map((_paragraph, index) => (
            <p key={index}>{t(`website.paragraphs.p${index + 16}`)}</p>
          ))}

          <ProjectImage src={ciWebsiteImg} alt="website-ci-cd" />
        </div>
      </ProjectSection>

      <ProjectSection id="frontend">
        <h2 className="pb-10 text-xl font-bold uppercase">{t('frontend.title')}</h2>

        <div className="space-y-4">
          {[...Array(1)].map((_paragraph, index) => (
            <p key={index}>{t(`frontend.paragraphs.p${index}`)}</p>
          ))}

          <ProjectLink content_id="Frontend_Mentor" href="https://github.com/inacio-dev/portfolio">
            <FrontendMentorLogo className="mr-3 h-8 w-auto" />
            Frontend Mentor Link
          </ProjectLink>

          {[...Array(4)].map((_paragraph, index) => (
            <p key={index}>{t(`frontend.paragraphs.p${index + 1}`)}</p>
          ))}
        </div>

        <h2 className="py-10 text-xl font-bold">{t('frontend.coffee.title')}</h2>

        <div className="space-y-4">
          {[...Array(4)].map((_paragraph, index) => (
            <p key={index}>{t(`frontend.coffee.paragraphs.p${index}`)}</p>
          ))}

          <div className="flex flex-row items-center justify-center space-x-10 fill-slate-dark-6 py-10 dark:fill-slate-light-3">
            <AstroLogo className="h-auto w-32 md:w-auto" />
            <TailwindLogo className="h-auto w-14 md:w-auto" />
          </div>

          <ProjectImage src={coffeeSiteImg} alt="coffee-site" />

          <div className="flex w-full flex-col items-center justify-center space-x-0 md:flex-row md:space-x-10">
            <ProjectLink
              content_id="G_Coffee"
              href="https://github.com/inacio-dev/coffeeroasters-subscription-site"
            >
              <GitHubIcon className="mr-3 h-8 w-auto" />
              Github Link
            </ProjectLink>

            <ProjectLink
              content_id="S_Coffee"
              href="https://in-dev-coffeeroasters-subscription-site.vercel.app/"
            >
              <PreviewIcon className="mr-3 h-8 w-auto" />
              Site Link
            </ProjectLink>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection id="sites">
        <h2 className="pb-10 text-xl font-bold uppercase">{t('sites.title')}</h2>

        <div className="space-y-4">
          {[...Array(3)].map((_paragraph, index) => (
            <p key={index}>{t(`sites.paragraphs.p${index}`)}</p>
          ))}
        </div>

        <h2 className="py-10 text-xl font-bold">{t('sites.curcucalm.title')}</h2>

        <div className="space-y-4">
          {[...Array(1)].map((_paragraph, index) => (
            <p key={index}>{t(`sites.curcucalm.paragraphs.p${index}`)}</p>
          ))}

          <div className="flex w-full flex-col items-center justify-center space-x-0 md:flex-row md:space-x-10">
            <ProjectLink content_id="G_Curcucalm" href="https://github.com/inacio-dev/curcucalm">
              <GitHubIcon className="mr-3 h-8 w-auto" />
              Github Link
            </ProjectLink>

            <ProjectLink
              content_id="F_Curcucalm"
              href="https://www.figma.com/file/4VxinYdn50OLSO7hG8oJxF/Curcucalm?type=design&node-id=0%3A1&mode=design&t=TMAFd8D3Jeyg2BXj-1"
            >
              <FigmaLogo className="mr-3 h-8 w-auto" />
              Figma Link
            </ProjectLink>

            <ProjectLink content_id="S_Curcucalm" href="https://in-dev-curcucalm.vercel.app/">
              <PreviewIcon className="mr-3 h-8 w-auto" />
              Site Link
            </ProjectLink>
          </div>

          {[...Array(3)].map((_paragraph, index) => (
            <p key={index}>{t(`sites.curcucalm.paragraphs.p${index + 1}`)}</p>
          ))}

          <ProjectImage src={curcualmImg} alt="coffee-site" />
        </div>
      </ProjectSection>
    </MainSection>
  )
}
