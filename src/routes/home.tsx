import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="container">
      <div className="home-text">{t('home.text')}</div>

      <div className="home-buttons">
        <button className="contact-button">{t('home.contact')}</button>
        <button className="tour-button">{t('home.tour')}</button>
      </div>
    </div>
  )
}
