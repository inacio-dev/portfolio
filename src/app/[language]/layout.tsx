import '../globals.css'

import { Roboto_Flex } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Languages } from '@/src/utils/types'
import { NextIntlClientProvider, useLocale } from 'next-intl'

import { ThemeProvider } from './providers'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    language: Languages
  }
}) {
  const language = useLocale()
  let messages

  if (params.language !== language) {
    notFound()
  }

  try {
    messages = (await import(`@/src/messages/${language}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={language} className={roboto.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider locale={language} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
