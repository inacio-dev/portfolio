import { getTranslations } from 'next-intl/server'

import NavLink from './NavLink'

export default async function Navigation() {
  const t = await getTranslations('Navigation')

  return (
    <>
      <nav>
        <ul className="inline-flex space-x-4">
          <li>
            <NavLink href="/">{t('home')}</NavLink>
          </li>
          <li>
            <NavLink href="/portfolio">{t('portfolio')}</NavLink>
          </li>
          <li>
            <NavLink href="/contact">{t('contact')}</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}
