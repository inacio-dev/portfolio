import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import IconDownload from '../svg/icons/Download'
import { History } from '../types'

interface HistoryProps {
  showFull: boolean
  setShowFull: Dispatch<SetStateAction<boolean>>
  history: History
}

export default function HistoryFooter({ showFull, setShowFull, history }: HistoryProps) {
  const { i18n } = useTranslation()

  return (
    <div
      id="history-footer"
      className="fixed bottom-0 z-50 flex h-fit w-full flex-col items-center justify-center space-x-[5%] space-y-5 bg-brand-purple p-[5%] transition-all lg:flex-row lg:space-y-0 lg:p-[2%]"
    >
      <button
        onClick={() => setShowFull(!showFull)}
        className="group flex h-12 items-center justify-center space-x-3 rounded-sm bg-brand-blue-columbia/20 px-3 text-xl text-slate-light-1 transition-all hover:bg-brand-blue-columbia/70 group-hover:transition-all"
      >
        {showFull ? history['back-button'] : history['button']}
      </button>

      <a
        href={`/portifolio-${i18n.language}.pdf`}
        className="flex items-center justify-center space-x-2"
        download
      >
        <IconDownload />
        <p className="text-xl text-slate-light-1">{history['download-button']}</p>
      </a>
    </div>
  )
}
