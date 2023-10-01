'use client'

import { useEffect, useState } from 'react'

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }
  return {
    width: 0,
    height: 0,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowDimensions.width !== 0 && windowDimensions.height !== 0) {
      setLoaded(true)
    }
  }, [windowDimensions])

  return { ...windowDimensions, loaded }
}
