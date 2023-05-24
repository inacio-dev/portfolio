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

export default function HistoryPage() {
  const { t, ready } = useTranslation()
  const [showFull, setShowFull] = useState<boolean>(false)

  const { height } = useWindowDimensions()
  const [elementRef, elementDimensions, reloadElementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')
  const footerSize = useElementSize('history-footer')

  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    setShowFull(false)
  }, [path])

  useEffect(() => {
    reloadElementDimensions()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [showFull])

  if (!ready) return <Loading />

  const history = t('history', { returnObjects: true }) as History

  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center justify-start space-y-5 overflow-hidden bg-slate-dark-1 text-slate-light-1 transition-all lg:justify-center',
        height >= elementDimensions.height + headerSize.height + 60 ? 'h-screen' : 'h-full'
      )}
      style={{
        paddingTop: `${headerSize.height + 30}px`,
        paddingBottom: `${footerSize.height + 30}px`
      }}
    >
      {showFull ? (
        <div
          ref={elementRef}
          className="flex max-w-[80%] flex-col items-center justify-center text-slate-light-1"
        >
          <h1 className="text-center text-4xl font-bold lg:text-6xl">{history.titles[0].title}</h1>
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

          <h1 className="text-center text-4xl font-bold lg:text-6xl">{history.titles[1].title}</h1>
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

          <h1 className="text-center text-4xl font-bold lg:text-6xl">{history.titles[2].title}</h1>
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
        </div>
      ) : (
        <div
          ref={elementRef}
          className="flex max-w-[80%] flex-col items-center justify-center text-slate-light-1"
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
        </div>
      )}
      <HistoryFooter showFull={showFull} setShowFull={setShowFull} history={history} />
    </div>
  )
}
