import { useEffect, useState } from 'react'

export default function useElementSize(elementId: string) {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function updateElementSize() {
      const element = document.getElementById(elementId)
      if (element) {
        const { clientWidth: width, clientHeight: height } = element
        setElementSize({ width, height })
      }
    }

    window.addEventListener('resize', updateElementSize)

    updateElementSize()

    return () => window.removeEventListener('resize', updateElementSize)
  }, [elementId])

  return elementSize
}
