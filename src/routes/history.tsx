import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import HistoryFooter from '../components/HistoryFooter'
import Loading from '../components/Loading'
import { History } from '../types'
import IconLink from '../svg/icons/IconLink'

export default function HistoryPage() {
  const { t, ready } = useTranslation()
  const [showFull, setShowFull] = useState<boolean>(false)
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    setShowFull(false)
  }, [path])

  if (!ready) return <Loading />

  const history = t('history', { returnObjects: true }) as History

  return (
    <div
      className={clsx(
        `flex w-full flex-col items-center justify-center bg-slate-dark-1`,
        showFull
          ? 'h-full pt-5 pb-[250px] lg:pt-[150px]'
          : 'h-full pt-5 pb-[250px] lg:h-screen lg:pb-0 lg:pt-0'
      )}
    >
      {showFull ? (
        <div className="flex max-w-[80%] flex-col items-center justify-center text-slate-light-1">
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
                        <Link to={info.link} replace>
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
                        <Link to={info.link} replace>
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
                        <Link to={info.link} replace>
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
        <div className="flex max-w-[80%] flex-col items-center justify-center text-slate-light-1">
          <h1 className="text-center text-4xl font-bold lg:text-6xl">{history['short-title']}</h1>

          <div className="flex flex-col items-start justify-center space-y-3 py-5">
            {history.informations.map(
              (info, index) =>
                info.presently === true && (
                  <div key={index} className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center space-x-3">
                      <h2 className="text-xl font-semibold">{info.name}</h2>
                      {info.link && (
                        <Link to={info.link} replace>
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
