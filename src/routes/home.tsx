import { useTranslation } from 'react-i18next'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'
import Loading from '../components/Loading'
import { Info } from '../types'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import IconTour from '../svg/icons/Tour'
import IconHomeChange from '../svg/icons/HomeChange'
import ContentPage from '../components/ContentPage'

export default function HomePage() {
  const { t, ready, i18n } = useTranslation()

  const [infoSize] = useElementSize('info')

  const controls = useAnimation()
  const [ref, inView] = useInView()

  const [changeInfo, setChangeInfo] = useState<number>(1)

  function setInfo() {
    controls.start('hidden')

    setTimeout(() => {
      setChangeInfo(changeInfo === 3 ? 1 : changeInfo + 2)
    }, 1200)
  }

  useEffect(() => {
    inView ? controls.start('visible') : controls.start('hidden')
  }, [controls, inView, changeInfo])

  if (!ready) return <Loading />

  const info = t('home.informations', { returnObjects: true }) as Info[]

  return (
    <ContentPage reloadVariableSize={[changeInfo]} className="lg:grid lg:grid-cols-2">
      <div className="flex flex-col space-y-10">
        <div>
          <h1 className="text-6xl font-extrabold lg:text-8xl">INÁCIO</h1>
          <h1 className="text-6xl font-extrabold lg:text-8xl">RODRIGUES</h1>
        </div>

        <p className="text-lg">{t('home.text')}</p>

        <div className="flex space-x-10">
          <a
            href={`/${i18n.language}/about`}
            className="group flex h-12 items-center justify-center space-x-3 rounded-sm bg-brand-purple px-3 text-xl text-slate-light-1 transition-all hover:bg-brand-purple/60 group-hover:transition-all"
          >
            {t('home.contact')}
          </a>

          <a href="" className="invisible hidden items-center justify-center space-x-2 lg:flex">
            <IconTour />
            <p className="text-xl text-slate-light-1">{t('home.tour')}</p>
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <img
          src="/home-image.svg"
          className={clsx('flex items-center justify-center', infoSize.height > 200 && 'w-[80%]')}
          alt="home-image"
        />

        <div id="info" className="flex flex-col items-end justify-center space-y-4">
          <button onClick={setInfo} className="flex items-center justify-center">
            <IconHomeChange />
          </button>

          <div className="flex flex-col items-center justify-center">
            {info.map(
              (info, index) =>
                (info.id === changeInfo || info.id === changeInfo + 1) && (
                  <motion.div
                    ref={ref}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
                      hidden: { opacity: 0, y: 30, transition: { duration: 1, delay: 0.2 } }
                    }}
                    initial="hidden"
                    key={index}
                    className="grid border-collapse grid-cols-2 items-center border-b border-t border-slate-light-1 p-3"
                  >
                    <h1 className="text-lg font-semibold">{info.title}</h1>
                    <p>{info.text}</p>
                  </motion.div>
                )
            )}
          </div>
        </div>
      </div>
    </ContentPage>
  )
}
