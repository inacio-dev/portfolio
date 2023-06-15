import { useEffect, useState } from 'react'

export type ElementSize = {
  width: number
  height: number
}

type ReloadElementSize = () => void

export default function useElementSize(elementId: string): [ElementSize, ReloadElementSize] {
  const [elementSize, setElementSize] = useState<ElementSize>({ width: 0, height: 0 })

  useEffect(() => {
    const updateElementSize = () => {
      const element = document.getElementById(elementId)
      if (element) {
        const { width, height } = element.getBoundingClientRect()
        setElementSize({ width, height })
      }
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setElementSize({ width, height })
      }
    })

    const element = document.getElementById(elementId)
    if (element) {
      resizeObserver.observe(element)
      updateElementSize()
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element)
      }
    }
  }, [elementId])

  const reloadElementSize: ReloadElementSize = () => {
    const element = document.getElementById(elementId)
    if (element) {
      const { width, height } = element.getBoundingClientRect()
      setElementSize({ width, height })
    }
  }

  return [elementSize, reloadElementSize]
}
