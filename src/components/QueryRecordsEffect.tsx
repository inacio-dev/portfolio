'use client'

import { useEffect, useState } from 'react'

import { useRouter } from '../navigation'

type QueryRecordsEffectProps = {
  view: string | undefined
}

export default function QueryRecordsEffect({ view }: QueryRecordsEffectProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!mounted) return

    if (!view || !['resume', 'ongoing'].includes(view)) {
      return router.replace({ pathname: '/records', query: { view: 'ongoing' } })
    }
  }, [mounted, view, router])

  useEffect(() => {
    setMounted(true)
  }, [])

  return <></>
}
