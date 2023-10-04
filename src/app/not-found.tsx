'use client'

import './globals.css'

import Error from 'next/error'
import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function NotFound() {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}
