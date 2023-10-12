'use client'

import { useEffect, useState } from 'react'

import scrollTo from '../utils/scrollTo'

type ScrollToContactProps = {
  value: string | string[] | undefined
}

export default function ScrollToContact({ value }: ScrollToContactProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) return

    value &&
      setTimeout(() => {
        scrollTo('contact')
      }, 1000)
  }, [mounted, value])

  useEffect(() => {
    setMounted(true)
  }, [])

  return <></>
}
