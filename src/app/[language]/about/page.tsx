import FrontendMentorLogo from '@/src/assets/FrontendMentorLogo'
import WorkanaLogo from '@/src/assets/WorkanaLogo'
import MainSection from '@/src/components/MainSection'
import ScrollToContact from '@/src/components/ScrollToContact'
import { Languages } from '@/src/utils/types'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { language },
}: {
  params: { language: Languages }
}) {
  const t = await getTranslator(language, 'About')
  const creator = 'Inácio Rodrigues'

  try {
    const title = `${creator} | ${t('title')}`
    const description = t('description')
    return { title, description, creator }
  } catch (error) {
    return { title: creator, description: '', creator }
  }
}

const classNameProps =
  'z-20 fill-slate-dark-6 transition-all duration-500 group-hover:fill-slate-dark-6 dark:fill-slate-light-3 dark:group-hover:fill-slate-light-3'

const links = [
  {
    label: '(85) 9.9827-7174',
    name: 'Whatsapp',
    href: 'https://wa.me/5585998277174/',
    icon: <WhatsAppIcon fontSize="medium" className={classNameProps} />,
  },
  {
    label: 'inacio-rodrigues-dev',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/inacio-rodrigues-dev/',
    icon: <LinkedInIcon fontSize="medium" className={classNameProps} />,
  },
  {
    label: '@inacio-dev',
    name: 'GitHub',
    href: 'https://github.com/inacio-dev',
    icon: <GitHubIcon fontSize="medium" className={classNameProps} />,
  },
  {
    label: 'inaciormgalvao@outlook.com',
    name: 'Email',
    href: 'mailto:inaciormgalvao@outlook.com',
    icon: <EmailIcon fontSize="medium" className={classNameProps} />,
  },
  {
    label: '@inaciodev',
    name: 'Instagram',
    href: 'https://www.instagram.com/inaciodev/',
    icon: <InstagramIcon fontSize="medium" className={classNameProps} />,
  },
  {
    label: '@inacio-dev',
    name: 'Frontend Mentor',
    href: 'https://www.frontendmentor.io/profile/inacio-dev',
    icon: <FrontendMentorLogo className={classNameProps} />,
  },
  {
    label: 'Inácio R.',
    name: 'Workana',
    href: 'https://www.workana.com/freelancer/d19115f803e41af80776e952d9e1bdd1',
    icon: <WorkanaLogo className={classNameProps} />,
  },
]

export default async function About({
  params: { language },
  searchParams,
}: {
  params: { language: Languages }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = await getTranslator(language, 'About')

  const keys = ['p1', 'p2', 'p3'] as const

  return (
    <MainSection>
      <ScrollToContact value={searchParams.contact} />

      <h1 className="text-center text-4xl font-bold uppercase md:text-5xl">{t('page-title')}</h1>

      <div className="grid space-y-5 text-start text-xs md:text-base">
        {keys.map((paragraph, index) => (
          <p key={index}>{t(`text.${paragraph}`)}</p>
        ))}
      </div>

      <h1 className="text-center text-xl font-medium uppercase">{t('contact-title')}</h1>

      <ul
        id="contact"
        className="grid w-full grid-cols-1 items-center justify-center gap-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={
                link.href +
                (link.name === 'LinkedIn' ? (language === 'pt' ? '' : '?locale=en_US') : '')
              }
              target={link.name === 'Email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group relative flex h-14 w-full flex-row items-center justify-start space-x-2 overflow-hidden rounded-sm border-b-4 border-b-brand-mindaro transition-colors hover:border-b-slate-dark-6 hover:duration-700 dark:border-b-brand-indigo dark:hover:border-b-slate-light-3 dark:hover:duration-700"
            >
              <span className="absolute inset-0 flex translate-x-[-101%] items-center justify-start bg-brand-mindaro pl-12 text-slate-dark-6 transition-all delay-200 duration-300 group-hover:translate-x-0 dark:bg-brand-indigo dark:text-slate-light-3">
                {link.name}
              </span>
              {link.icon}
              <span className="text-slate-dark-6 transition-all duration-500 dark:text-slate-light-3">
                {(link.name === 'Whatsapp' ? (language === 'pt' ? '' : '+ 55 ') : '') + link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </MainSection>
  )
}
