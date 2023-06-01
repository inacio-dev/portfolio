import { useTranslation } from 'react-i18next'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementDimensions from '../hooks/use-elementDimensions'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'
import HomeImage from '../svg/images/ImageHome'
import Loading from '../components/Loading'
import IconTour from '../svg/icons/IconTour'
import { Info } from '../types'
import { useEffect, useState } from 'react'
import IconHomeChange from '../svg/icons/IconHomeChange'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function HomePage() {
  const { t, ready, i18n } = useTranslation()

  const { width, height } = useWindowDimensions()
  const [elementRef, elementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')
  const infoSize = useElementSize('info')

  const [changeInfo, setChangeInfo] = useState(1)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
    hidden: { opacity: 0, y: 30, transition: { duration: 1, delay: 0.2 } }
  }

  function setInfo() {
    controls.start('hidden')

    setTimeout(() => {
      setChangeInfo(changeInfo === 3 ? 1 : changeInfo + 2)
    }, 1200)
  }

  if (!ready) return <Loading />

  useEffect(() => {
    inView ? controls.start('visible') : controls.start('hidden')
  }, [controls, inView, changeInfo])

  const info = t('home.informations', { returnObjects: true }) as Info[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.8 } }}
      exit={{ opacity: 0.5, y: 20, transition: { duration: 0.4 } }}
      className={clsx(
        'flex w-full flex-col items-center justify-center space-y-5 overflow-hidden bg-slate-dark-1 text-slate-light-1 transition-all',
        height >= elementDimensions.height + headerSize.height + 60 ? 'h-screen' : 'h-full'
      )}
      style={{
        paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`
      }}
    >
      <div ref={elementRef} className="grid items-center px-[10%] lg:grid-cols-2">
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
          <HomeImage className={clsx(infoSize.height > 200 && 'w-[80%]')} />

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
                      variants={variants}
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
      </div>
    </motion.div>
  )
}
