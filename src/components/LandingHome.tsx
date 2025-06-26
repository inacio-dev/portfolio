'use client'

import Link from 'next/link'
import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { Typewriter } from 'react-simple-typewriter'

import MyExperience from './MyExperience'

export default function LandingHome() {
  const t = useTranslations('LandingHome')

  const words = [t('word1'), t('word2'), t('word3'), t('word4'), t('word5')]

  return (
    <div className="relative z-10 flex h-full min-h-[75svh] w-full flex-col items-center justify-center space-y-6 px-10 text-center text-white lg:px-2">
      <Link
        href="https://github.com/inacio-dev/portfolio.git"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-header-button/70 hover:bg-header inline-flex items-center justify-center space-x-2 rounded-full px-6 py-2 text-start text-xs transition-all duration-300 lg:text-base"
      >
        <GithubLogoIcon size={22} />
        <span>{t('portfolioSource')}</span>
        <ArrowUpRightIcon size={22} />
      </Link>

      <span className="z-10 mt-12 text-3xl lg:text-6xl">
        <Typewriter words={words} typeSpeed={200} delaySpeed={3000} cursor loop />
      </span>

      <p className="z-10 md:max-w-[800px] 2xl:max-w-[1000px]">{t('description')}</p>

      <div className="mt-12 flex flex-col space-y-4 space-x-0 lg:flex-row lg:space-y-0 lg:space-x-4">
        <MyExperience />

        <Link
          href="https://wa.me/+5585998277174?text=Olá, gostaria de solicitar um orçamento."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 rounded-full bg-white px-6 py-2 text-start text-xs text-black transition-all duration-300 hover:bg-white/70 lg:text-base"
        >
          <span>{t('requestQuote')}</span>
        </Link>
      </div>
    </div>
  )
}
