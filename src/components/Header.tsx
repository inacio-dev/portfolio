import React from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="#home">{t('header.name')}</a>
          </li>
          <li>
            <a href="#about">{t('header.about')}</a>
          </li>
          <li>
            <a href="#terms">{t('header.terms')}</a>
          </li>
          <li>
            <a href="#history">{t('header.history')}</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
