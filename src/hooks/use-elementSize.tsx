import { useEffect, useState } from 'react'

export default function useElementSize(elementId: string) {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = document.getElementById(elementId)
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setElementSize({ width, height })
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.unobserve(element)
    }
  }, [elementId])

  return elementSize
}
