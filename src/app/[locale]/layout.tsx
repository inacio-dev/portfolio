import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import '../globals.css'

import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import StyleLayout from '@/components/StyleLayout'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={`${jetbrainsMono.variable} min-h-screen antialiased`}>
        <NextIntlClientProvider>
          <StyleLayout>{children}</StyleLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
