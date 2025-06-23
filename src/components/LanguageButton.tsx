'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import clsx from 'clsx'
import { Locale, useLocale } from 'next-intl'

export default function LanguageButton() {
  const locales = routing.locales
  const currentLocale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function changeLocale(locale: Locale) {
    router.push(pathname, { locale })
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-300 hover:bg-white/60">
            <span className="text-black">{currentLocale.toUpperCase()}</span>
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            {locales.map((locale, index) => (
              <MenuItem key={index}>
                <button
                  onClick={() => changeLocale(locale)}
                  className={clsx(
                    'block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden',
                    currentLocale === locale ? 'bg-black/20' : '',
                  )}
                >
                  <span>{locale.toUpperCase()}</span>
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </>
  )
}
