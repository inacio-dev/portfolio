import Image from 'next/image'
import { Link } from '@/i18n/navigation'

import CvDownloadButton from './CvDownloadButton'
import DoubtButton from './DoubtButton'
import MenuButton from './MenuButton'
import NavLink from './NavLink'
import ProfileButton from './ProfileButton'

export default async function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 pt-4 lg:px-12 lg:pt-6 lg:backdrop-blur-xs">
      <Link href="/">
        <Image src="/logo-small.png" width={48} height={48} alt="logo" priority />
      </Link>

      <header className="bg-header hidden w-auto items-center justify-between rounded-full px-4 py-2 lg:flex lg:w-[50vw] 2xl:w-[40vw]">
        <nav>
          <ul className="inline-flex space-x-6">
            <li>
              <NavLink href="/">Início</NavLink>
            </li>
            <li>
              <NavLink href="/portfolio">Portfólio</NavLink>
            </li>
            <li>
              <NavLink href="/contact">Contato</NavLink>
            </li>
          </ul>
        </nav>

        <div className="inline-flex items-center justify-center space-x-2">
          <CvDownloadButton />
          <DoubtButton />
        </div>
      </header>

      <div className="hidden lg:block">
        <ProfileButton />
      </div>

      <div className="block lg:hidden">
        <MenuButton />
      </div>
    </div>
  )
}
