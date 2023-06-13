import { useState, useEffect, useRef, LegacyRef } from 'react'

type ElementDimensions = {
  width: number
  height: number
}

type ElementDimensionsHookResult = [
  LegacyRef<HTMLDivElement>,
  ElementDimensions,
  () => void,
  (pause: boolean) => void
]

export default function useElementDimensions(): ElementDimensionsHookResult {
  const [elementDimensions, setElementDimensions] = useState<ElementDimensions>({
    width: 0,
    height: 0
  })
  const [isPaused, setIsPaused] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const getElementDimensions = () => {
    if (!isPaused && elementRef.current) {
      const { clientWidth: width, clientHeight: height } = elementRef.current
      setElementDimensions({ width, height })
    }
  }

  const handleDimensionsCapture = (pause: boolean) => {
    setIsPaused(pause)
  }

  const reloadElementDimensions = () => {
    getElementDimensions()
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setElementDimensions({ width, height })
      }
    })

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current)
      }
    }
  }, [])

  return [elementRef, elementDimensions, reloadElementDimensions, handleDimensionsCapture]
}
