import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import HistoryFooter from '../components/HistoryFooter'
import Loading from '../components/Loading'
import { History } from '../types'
import IconLink from '../svg/icons/IconLink'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementDimensions from '../hooks/use-elementDimensions'
import useElementSize from '../hooks/use-elementSize'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function HistoryPage() {
  const { t, ready } = useTranslation()
  const [showFull, setShowFull] = useState<boolean>(false)

  const { width, height } = useWindowDimensions()
  const [elementRef, elementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')
  const footerSize = useElementSize('history-footer')

  const location = useLocation()
  const path = location.pathname

  const controls = useAnimation()
  const [ref, inView] = useInView()

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
    hidden: { opacity: 0, y: 30, transition: { duration: 1, delay: 0.2 } }
  }

  function setInfo() {
    controls.start('hidden')

    setTimeout(() => {
      setShowFull(!showFull)
    }, 1200)
  }

  useEffect(() => {
    inView ? controls.start('visible') : controls.start('hidden')
  }, [controls, inView, showFull])

  useEffect(() => {
    setShowFull(false)
  }, [path])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [showFull])

  if (!ready) return <Loading />

  const history = t('history', { returnObjects: true }) as History

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
        paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`,
        paddingBottom: width > 1023 ? `${footerSize.height + 60}px` : `${headerSize.height + 30}px`
      }}
    >
      {showFull ? (
        <div
          ref={elementRef}
          className="flex max-w-[80%] flex-col items-center justify-center text-slate-light-1"
        >
          <motion.div
            ref={ref}
            animate={controls}
            variants={variants}
            initial="hidden"
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-center text-4xl font-bold lg:text-6xl">
              {history.titles[0].title}
            </h1>
            <div className="flex flex-col items-start justify-center space-y-5 py-5">
              {history.informations.map(
                (info, index) =>
                  info.title === 1 && (
                    <div key={index} className="flex flex-col items-start justify-center">
                      <span className="font-light">{info.time}</span>

                      <div className="flex items-center justify-center space-x-3">
                        <h2 className="text-xl font-semibold">{info.name}</h2>
                        {info.link && (
                          <Link to={info.link} replace className="transition-all hover:scale-125">
                            <IconLink className="w-8" />
                          </Link>
                        )}
                      </div>

                      {info.paragraphs.map((parag, index) => (
                        <p className="font-regular py-1 pl-10 text-base" key={index}>
                          {parag}
                        </p>
                      ))}
                    </div>
                  )
              )}
            </div>

            <h1 className="text-center text-4xl font-bold lg:text-6xl">
              {history.titles[1].title}
            </h1>
            <div className="flex flex-col items-start justify-center space-y-5 py-5">
              {history.informations.map(
                (info, index) =>
                  info.title === 2 && (
                    <div key={index} className="flex flex-col items-start justify-center">
                      <span className="font-light">{info.time}</span>

                      <div className="flex items-center justify-center space-x-3">
                        <h2 className="text-xl font-semibold">{info.name}</h2>
                        {info.link && (
                          <Link to={info.link} replace className="transition-all hover:scale-125">
                            <IconLink className="w-8" />
                          </Link>
                        )}
                      </div>

                      {info.paragraphs.map((parag, index) => (
                        <p className="font-regular py-1 pl-10 text-base" key={index}>
                          {parag}
                        </p>
                      ))}
                    </div>
                  )
              )}
            </div>

            <h1 className="text-center text-4xl font-bold lg:text-6xl">
              {history.titles[2].title}
            </h1>
            <div className="flex flex-col items-start justify-center space-y-5 py-5">
              {history.informations.map(
                (info, index) =>
                  info.title === 3 && (
                    <div key={index} className="flex flex-col items-start justify-center">
                      <span className="font-light">{info.time}</span>

                      <div className="flex items-center justify-center space-x-3">
                        <h2 className="text-xl font-semibold">{info.name}</h2>
                        {info.link && (
                          <Link to={info.link} replace className="transition-all hover:scale-125">
                            <IconLink className="w-8" />
                          </Link>
                        )}
                      </div>

                      {info.paragraphs.map((parag, index) => (
                        <p className="font-regular py-1 pl-10 text-base" key={index}>
                          {parag}
                        </p>
                      ))}
                    </div>
                  )
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div
          ref={elementRef}
          className="flex max-w-[80%] flex-col items-center justify-center text-slate-light-1"
        >
          <motion.div
            ref={ref}
            animate={controls}
            variants={variants}
            initial="hidden"
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-center text-4xl font-bold lg:text-6xl">{history['short-title']}</h1>

            <div className="flex flex-col items-start justify-center space-y-3 py-5">
              {history.informations.map(
                (info, index) =>
                  info.presently === true && (
                    <div key={index} className="flex flex-col items-start justify-center">
                      <div className="flex items-center justify-center space-x-3">
                        <h2 className="text-xl font-semibold">{info.name}</h2>
                        {info.link && (
                          <Link to={info.link} replace className="transition-all hover:scale-125">
                            <IconLink className="w-8" />
                          </Link>
                        )}
                      </div>

                      {info.paragraphs.map((parag, index) => (
                        <p className="font-regular py-1 pl-10 text-base" key={index}>
                          {parag}
                        </p>
                      ))}
                    </div>
                  )
              )}
            </div>
          </motion.div>
        </div>
      )}
      <HistoryFooter showFull={showFull} setShowFull={setInfo} history={history} />
    </motion.div>
  )
}
