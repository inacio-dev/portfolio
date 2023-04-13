import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import HistoryFooter from '../components/HistoryFooter'
import Loading from '../components/Loading'
import { History } from '../types'

export default function HistoryPage() {
  const { t, ready } = useTranslation()
  const [showFull, setShowFull] = useState<boolean>(false)

  if (!ready) return <Loading />

  const history = t('history', { returnObjects: true }) as History

  return (
    <>
      <div
        className={clsx(
          `flex w-screen items-center justify-center bg-slate-dark-1`,
          showFull ? 'h-fit' : 'h-screen'
        )}
      >
        123
        <HistoryFooter />
      </div>
    </>
  )
}
