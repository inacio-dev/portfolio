import { useState, useEffect, useRef, LegacyRef } from 'react'

type ElementDimensions = {
  width: number
  height: number
}

export default function useElementDimensions(): [
  LegacyRef<HTMLDivElement>,
  ElementDimensions,
  () => void
] {
  const [elementDimensions, setElementDimensions] = useState<ElementDimensions>({
    width: 0,
    height: 0
  })
  const elementRef = useRef<HTMLDivElement>(null)

  const getElementDimensions = () => {
    if (elementRef.current) {
      const { clientWidth: width, clientHeight: height } = elementRef.current
      setElementDimensions({ width, height })
    }
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

  return [elementRef, elementDimensions, reloadElementDimensions]
}
