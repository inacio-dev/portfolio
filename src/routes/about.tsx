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
import { motion } from 'framer-motion'

export default function AboutPage() {
  const { t, ready } = useTranslation()

  if (!ready) return <Loading />

  const about = t('about', { returnObjects: true }) as About

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-5 bg-slate-dark-1 pt-5 text-slate-light-1 lg:h-screen lg:pt-0">
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
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        >
          <Link
            to="https://wa.me/qr/2EQBCN2D4446M1"
            className="flex items-center justify-center space-x-3 px-10 py-5"
          >
            <Whatsapp className="w-10" /> <span>Whatsapp</span>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        >
          <Link
            to="https://instagram.com/inaciormg"
            className="flex items-center justify-center space-x-3 px-10 py-5"
          >
            <Instagram className="w-10" /> <span>Instagram</span>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        >
          <Link
            to="https://github.com/inacio-dev"
            className="flex items-center justify-center space-x-3 px-10 py-5"
          >
            <GitHub className="w-10" /> <span>GitHub</span>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        >
          <Link
            to="https://www.behance.net/inciorodrigues"
            className="flex items-center justify-center space-x-3 px-10 py-5"
          >
            <Behance className="w-10" /> <span>Behance</span>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        >
          <Link
            to="https://www.linkedin.com/in/inacio-rodrigues-dev"
            className="flex items-center justify-center space-x-3 px-10 py-5"
          >
            <LinkedIn className="w-10" /> <span>LinkedIn</span>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        >
          <Link
            to="mailto:inaciormgalvao@outlook.com"
            className="flex items-center justify-center space-x-3 px-10 py-5"
          >
            <Email className="w-10" /> <span>Email</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
