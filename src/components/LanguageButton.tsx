'use client'

import { MouseEvent, useState } from 'react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { Menu, MenuItem } from '@mui/material'
import { Locale, useLocale } from 'next-intl'

export default function LanguageButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const locales = routing.locales
  const currentLocale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function changeLocale(locale: Locale) {
    router.push(pathname, { locale })
    handleClose()
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-300 hover:bg-white/60"
      >
        <span className="text-black">{currentLocale.toUpperCase()}</span>
      </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
            className: 'bg-header-button text-white',
          },
        }}
      >
        {locales.map((locale, index) => (
          <MenuItem
            key={index}
            onClick={() => changeLocale(locale)}
            selected={currentLocale === locale}
            sx={{
              backgroundColor: currentLocale === locale ? 'rgba(255,255,255,0.3)' : 'transparent',
              transition: 'background-color 300ms ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.4)',
                },
              },
            }}
          >
            <span>{locale.toUpperCase()}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
