import { useTranslation } from 'react-i18next'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementDimensions from '../hooks/use-elementDimensions'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'
import HomeImage from '../svg/images/ImageHome'
import Loading from '../components/Loading'
import IconTour from '../svg/icons/IconTour'

export default function HomePage() {
  const { t, ready, i18n } = useTranslation()

  const { width, height } = useWindowDimensions()
  const [elementRef, elementDimensions] = useElementDimensions()
  const headerSize = useElementSize('header')

  if (!ready) return <Loading />

  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center justify-center space-y-5 overflow-hidden bg-slate-dark-1 text-slate-light-1 transition-all',
        height >= elementDimensions.height + headerSize.height + 60 ? 'h-screen' : 'h-full'
      )}
      style={{
        paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`
      }}
    >
      <div ref={elementRef} className="grid px-[10%] lg:grid-cols-2">
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
            <a href="" className="flex items-center justify-center space-x-2">
              <IconTour />
              <p className="text-xl text-slate-light-1">{t('home.tour')}</p>
            </a>
          </div>
        </div>

        <div>
          <HomeImage className="" />
        </div>
      </div>
    </div>
  )
}
