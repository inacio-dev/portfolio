import { useEffect, useState } from 'react'

type ElementSize = {
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
        const computedStyle = getComputedStyle(element)
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0
        const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0
        const contentWidth = width - paddingLeft - paddingRight
        const contentHeight = height - paddingTop - paddingBottom
        setElementSize({ width: contentWidth, height: contentHeight })
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
      const computedStyle = getComputedStyle(element)
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0
      const contentWidth = width - paddingLeft - paddingRight
      const contentHeight = height - paddingTop - paddingBottom
      setElementSize({ width: contentWidth, height: contentHeight })
    }
  }

  return [elementSize, reloadElementSize]
}
