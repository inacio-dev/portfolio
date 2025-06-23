import Image from 'next/image'
import { Link } from '@/i18n/navigation'

import DownloadCvButton from './DownloadCvButton'
import LanguageButton from './LanguageButton'
import MenuDrawer from './MenuDrawer'
import Navigation from './Navigation'
import ProfileDrawer from './ProfileDrawer'

export default async function Header() {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-4 pt-4 lg:px-12 lg:pt-6 lg:backdrop-blur-xs">
      <Link href="/">
        <Image src="/logo-small.png" width={48} height={48} alt="logo" priority />
      </Link>

      <header className="bg-header hidden w-auto items-center justify-between rounded-full px-4 py-2 lg:flex lg:w-[50vw] 2xl:w-[40vw]">
        <Navigation />

        <div className="inline-flex items-center justify-center space-x-2">
          <DownloadCvButton />
          <LanguageButton />
        </div>
      </header>

      <div className="hidden lg:block">
        <ProfileDrawer />
      </div>

      <div className="block lg:hidden">
        <MenuDrawer />
      </div>
    </div>
  )
}
