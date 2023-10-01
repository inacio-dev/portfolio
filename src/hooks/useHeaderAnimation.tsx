'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type HeaderAnimationHookResult = [boolean]

export default function useHeaderAnimation(): HeaderAnimationHookResult {
  const pathname = usePathname()

  const [isChanged, setIsChanged] = useState(true)

  useEffect(() => {
    setIsChanged(true)

    setTimeout(() => {
      setIsChanged(false)
    }, 5000)
  }, [pathname])

  return [isChanged]
}
