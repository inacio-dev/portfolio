'use client'

import { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useTheme } from 'next-themes'

import Spinner from '../assets/icons/Spinner'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { width, loaded } = useWindowDimensions()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !loaded) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-light-1 font-bold shadow-md transition-all duration-500 hover:bg-slate-light-3 dark:bg-slate-light-3/10 dark:hover:bg-slate-light-3/40 md:h-12 md:w-12">
        <Spinner className="fill-slate-dark-6 dark:fill-slate-light-3" />
      </div>
    )
  }

  return (
    <button
      aria-label="theme-switcher"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-light-1 text-base font-bold text-slate-dark-6 shadow-md transition-all duration-500 hover:bg-slate-light-3 dark:bg-slate-light-3/10 dark:text-slate-light-3 dark:hover:bg-slate-light-3/40 md:h-12 md:w-12 md:text-xl"
    >
      {theme === 'dark' ? (
        <DarkModeIcon fontSize={width > 768 ? 'medium' : 'small'} />
      ) : (
        <LightModeIcon fontSize={width > 768 ? 'medium' : 'small'} />
      )}
    </button>
  )
}
