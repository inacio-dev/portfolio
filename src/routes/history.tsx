import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import HistoryFooter from '../components/HistoryFooter'
import Loading from '../components/Loading'
import { History } from '../types'

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
    <>
      <div
        className={clsx(
          `flex w-full flex-col items-center justify-center bg-slate-dark-1`,
          showFull ? 'h-full' : 'h-screen'
        )}
      >
        123
        <HistoryFooter showFull={showFull} setShowFull={setShowFull} history={history} />
      </div>
    </>
  )
}
