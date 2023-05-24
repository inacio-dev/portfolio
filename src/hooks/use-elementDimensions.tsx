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
    getElementDimensions()
  }, [elementRef.current])

  useEffect(() => {
    window.addEventListener('resize', getElementDimensions)
    return () => {
      window.removeEventListener('resize', getElementDimensions)
    }
  }, [])

  return [elementRef, elementDimensions, reloadElementDimensions]
}
