import Image from 'next/image'
import { Link } from '@/i18n/navigation'

import { fetchGitHubStats } from '@/lib/fetchGitHubStats'

import DownloadCvButton from './DownloadCvButton'
import LanguageButton from './LanguageButton'
import MobileMenu from './MobileMenu'
import MyProfile from './MyProfile'
import Navigation from './Navigation'

export default async function Header() {
  const githubStats = await fetchGitHubStats()

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-4 pt-4 lg:px-12 lg:pt-6 lg:backdrop-blur-xs">
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
        <MyProfile githubStats={githubStats} />
      </div>

      <div className="block lg:hidden">
        <MobileMenu />
      </div>
    </div>
  )
}
