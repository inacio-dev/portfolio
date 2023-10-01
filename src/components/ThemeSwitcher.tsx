'use client'

import { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useTheme } from 'next-themes'

import Spinner from '../assets/icons/Spinner'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-slate-light-1/20 text-xl font-medium transition-all duration-500 hover:bg-slate-light-1/40 focus:bg-slate-light-1/20">
        <Spinner className="fill-slate-light-1" />
      </div>
    )
  }

  return (
    <button
      aria-label="theme-switcher"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex h-14 w-14 items-center justify-center rounded-sm bg-slate-light-1/20 text-xl font-medium transition-all duration-500 hover:bg-slate-light-1/40 focus:bg-slate-light-1/20"
    >
      {theme === 'dark' ? (
        <DarkModeIcon fontSize="medium" className="text-slate-dark-6 dark:text-slate-light-3" />
      ) : (
        <LightModeIcon fontSize="medium" className="text-slate-dark-6 dark:text-slate-light-3" />
      )}
    </button>
  )
}
