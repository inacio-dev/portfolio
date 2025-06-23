import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('NotFound')

  return (
    <div className="flex h-[calc(100svh-64px-32px)] flex-col items-center justify-center text-center lg:h-[calc(100vh-80px-32px)]">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <Link href="/" className="text-blue-500 transition-all duration-300 hover:text-blue-700">
        {t('returnHome')}
      </Link>
    </div>
  )
}
