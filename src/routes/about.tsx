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
import useWindowDimensions from '../hooks/get-windowDimensions'
import useElementDimensions from '../hooks/get-elementSizeByRef'
import clsx from 'clsx'
import useElementSize from '../hooks/get-elementSizeById'

export default function AboutPage() {
  const { t, ready } = useTranslation()

  const { height } = useWindowDimensions()
  const [elementRef, elementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')

  if (!ready) return <Loading />

  const about = t('about', { returnObjects: true }) as About

  return (
    <div
      ref={elementRef}
      className={clsx(
        'flex w-full flex-col items-center justify-start space-y-5 overflow-hidden bg-slate-dark-1 pb-8 text-slate-light-1 transition-all lg:justify-center',
        height >= elementDimensions.height + headerSize.height + 60 ? 'h-screen' : 'h-full'
      )}
      style={{
        paddingTop: `${headerSize.height + 30}px`
      }}
    >
      <h1 className="text-center text-4xl font-bold lg:text-6xl">{about.title}</h1>
      <div className="flex flex-col items-center justify-center space-y-3">
        {about.texts.map((text, index) => (
          <p key={index} className="max-w-[80%]">
            {text}
          </p>
        ))}
      </div>

      <h2 className="text-xl font-bold">{about['contact-title']}</h2>
      <div className="grid grid-cols-2 items-center justify-center lg:grid-cols-3">
        <Link
          to="https://wa.me/qr/2EQBCN2D4446M1"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-150 hover:scale-110"
        >
          <Whatsapp className="w-10" /> <span>Whatsapp</span>
        </Link>
        <Link
          to="https://instagram.com/inaciormg"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-150 hover:scale-110"
        >
          <Instagram className="w-10" /> <span>Instagram</span>
        </Link>
        <Link
          to="https://github.com/inacio-dev"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-150 hover:scale-110"
        >
          <GitHub className="w-10" /> <span>GitHub</span>
        </Link>
        <Link
          to="https://www.behance.net/inciorodrigues"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-150 hover:scale-110"
        >
          <Behance className="w-10" /> <span>Behance</span>
        </Link>
        <Link
          to="https://www.linkedin.com/in/inacio-rodrigues-dev"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-150 hover:scale-110"
        >
          <LinkedIn className="w-10" /> <span>LinkedIn</span>
        </Link>
        <Link
          to="mailto:inaciormgalvao@outlook.com"
          className="flex items-center justify-center space-x-3 px-10 py-5 transition-all delay-150 hover:scale-110"
        >
          <Email className="w-10" /> <span>Email</span>
        </Link>
      </div>
    </div>
  )
}
