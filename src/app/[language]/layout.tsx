import '../globals.css'

import { Roboto_Flex } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
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
      <head>
        <script>window.dataLayer = window.dataLayer || [];</script>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PDF2LLZ8');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider locale={language} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PDF2LLZ8" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
      </body>
    </html>
  )
}
