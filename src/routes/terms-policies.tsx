import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'
import { Terms } from '../types'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementSize from '../hooks/use-elementSize'
import clsx from 'clsx'

export default function PoliciesPage() {
  const { t, ready } = useTranslation()
  const { width, height } = useWindowDimensions()

  const [contentSize] = useElementSize('content')
  const [headerSize] = useElementSize('header')

  if (!ready) return <Loading />

  const terms = t('terms', { returnObjects: true }) as Terms

  return (
    <div
      id="content"
      className={clsx(
        'flex w-full flex-col items-center justify-center space-y-5 overflow-hidden bg-slate-dark-1 px-[10%] text-slate-light-1 transition-all',
        height >= contentSize.height + headerSize.height + (width > 1023 ? 60 : 30)
          ? 'h-screen'
          : 'h-full'
      )}
      style={{
        paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`
      }}
    >
      <h1 className="text-left text-2xl font-bold lg:text-4xl">{terms.title}</h1>
      <p className="text-left text-lg font-medium lg:text-lg">{terms.header}</p>

      <ul className="space-y-10">
        {terms.texts.map((text, index) => (
          <li key={index} className="space-y-3">
            <h2 className="text-left text-lg font-medium lg:text-lg">{text['sub-title']}</h2>

            <ul className="ml-6 space-y-3">
              {text.paragraphs.map((parag, index) => (
                <li key={index}>{parag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <span className="pt-10 pb-14">*** {terms.footer}</span>
    </div>
  )
}
