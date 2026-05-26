import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'

/**
 * Página 404 do segmento [locale] — captura qualquer rota não-mapeada
 * dentro de um idioma específico. Renderizada quando `notFound()` é
 * chamado num server component ou quando o pathname não tem
 * `page.tsx` correspondente.
 *
 * `useTranslations` funciona aqui porque o NextIntlClientProvider envelopa
 * a árvore pelo layout do locale — o not-found ainda vive dentro dele.
 */
export default function LocaleNotFound() {
  const t = useTranslations('NotFound')

  return (
    <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">{t('description')}</p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
          {t('back')}
        </Link>
      </Button>
    </section>
  )
}
