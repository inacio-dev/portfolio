import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'
import { About } from '../types'
import { Link } from 'react-router-dom'
import Whatsapp from '../svg/Whatsapp'
import Instagram from '../svg/Instagram'
import GitHub from '../svg/GitHub'
import Behance from '../svg/Behance'
import LinkedIn from '../svg/LinkedIn'
import Email from '../svg/Email'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementDimensions from '../hooks/use-elementDimensions'
import clsx from 'clsx'
import useElementSize from '../hooks/use-elementSize'
import AboutImage from '../svg/images/ImageAbout'

export default function AboutPage() {
  const { t, ready } = useTranslation()

  const { width, height } = useWindowDimensions()
  const [elementRef, elementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')

  if (!ready) return <Loading />

  const about = t('about', { returnObjects: true }) as About

  return (
    <div
      ref={elementRef}
      className={clsx(
        'flex w-full flex-col items-center justify-center space-y-5 overflow-hidden bg-slate-dark-1 text-slate-light-1 transition-all',
        height >= elementDimensions.height + headerSize.height + 60 ? 'h-screen' : 'h-full'
      )}
      style={{
        paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`
      }}
    >
      <div className="flex max-w-[60%] flex-col items-center justify-center lg:flex-row">
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="pb-10 text-center text-4xl font-bold lg:text-6xl">{about.title}</h1>
          {about.texts.map((text, index) => (
            <p key={index} className="max-w-[100%] lg:max-w-[80%]">
              {text}
            </p>
          ))}
        </div>

        <AboutImage className="w-full" />
      </div>

      <h2 className="text-xl font-bold">{about['contact-title']}</h2>
      <div className="grid grid-cols-2 items-center justify-center lg:grid-cols-3">
        <Link
          to="https://wa.me/qr/2EQBCN2D4446M1"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-100 hover:scale-110"
        >
          <Whatsapp className="w-10" /> <span>Whatsapp</span>
        </Link>
        <Link
          to="https://instagram.com/inaciormg"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-100 hover:scale-110"
        >
          <Instagram className="w-10" /> <span>Instagram</span>
        </Link>
        <Link
          to="https://github.com/inacio-dev"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-100 hover:scale-110"
        >
          <GitHub className="w-10" /> <span>GitHub</span>
        </Link>
        <Link
          to="https://www.behance.net/inciorodrigues"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-100 hover:scale-110"
        >
          <Behance className="w-10" /> <span>Behance</span>
        </Link>
        <Link
          to="https://www.linkedin.com/in/inacio-rodrigues-dev"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-100 hover:scale-110"
        >
          <LinkedIn className="w-10" /> <span>LinkedIn</span>
        </Link>
        <Link
          to="mailto:inaciormgalvao@outlook.com"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-100 hover:scale-110"
        >
          <Email className="w-10" /> <span>Email</span>
        </Link>
      </div>
    </div>
  )
}
