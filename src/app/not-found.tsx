'use client'

import './globals.css'

import Error from 'next/error'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export default function NotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}
