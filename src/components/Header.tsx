import { useLocale } from 'next-intl'
import { getTranslator } from 'next-intl/server'

import LanguageSwitcher from './LanguageSwitcher'
import LogoAnimation from './LogoAnimation'
import Navigation from './Navigation'
import NavigationMobile from './NavigationMobile'
import ThemeSwitcher from './ThemeSwitcher'

export default async function Header() {
  const language = useLocale()

  const t = await getTranslator(language, 'Header')

  return (
    <header className="fixed z-50 grid w-full">
      <div className="z-10 flex h-14 w-full items-center justify-end bg-brand-mindaro text-slate-light-3 shadow-md transition-all duration-500 dark:bg-brand-indigo md:h-24 md:bg-slate-light-3 md:dark:bg-slate-dark-2">
        <LogoAnimation title={t('title')} />

        <div className="z-10 flex h-full w-fit flex-row items-center justify-end space-x-3 overflow-hidden rounded-l-md bg-brand-mindaro pl-3 pr-[16px] transition-all duration-500 dark:bg-brand-indigo sm:pr-[33px] md:pr-28 md:shadow-md xl:pr-[16vw]">
          <Navigation />

          <ThemeSwitcher />

          <LanguageSwitcher />
        </div>
      </div>

      <NavigationMobile />
    </header>
  )
}
