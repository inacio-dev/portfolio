import clsx from 'clsx'
import useWindowDimensions from '../hooks/use-windowDimensions'
import useElementSize, { ElementSize } from '../hooks/use-elementSize'
import { useEffect } from 'react'

interface ContentPageProps {
  children: React.ReactNode
  reloadVariableSize?: any[]
  className?: string
  footerSize?: ElementSize
}

export default function ContentPage({
  children,
  reloadVariableSize,
  className,
  footerSize
}: ContentPageProps) {
  const { width, height } = useWindowDimensions()

  const [contentSize, reloadContentSize] = useElementSize('content')
  const [headerSize] = useElementSize('header')

  if (reloadVariableSize) {
    useEffect(() => {
      reloadContentSize()
    }, reloadVariableSize)
  }

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center overflow-hidden bg-slate-dark-1 px-[10%] text-slate-light-1 transition-all',
        height >=
          contentSize.height +
            headerSize.height +
            (footerSize ? footerSize.height : 0) +
            (width > 1023 ? 60 : 30)
          ? 'h-screen'
          : 'h-full'
      )}
      style={{
        paddingTop: width > 1023 ? `${headerSize.height + 60}px` : `${headerSize.height + 30}px`,
        paddingBottom:
          footerSize &&
          (width > 1023 ? `${footerSize.height + 60}px` : `${footerSize.height + 30}px`)
      }}
    >
      <div
        id="content"
        className={clsx('flex flex-col items-center justify-center space-y-5', className)}
      >
        {children}
      </div>
    </div>
  )
}
