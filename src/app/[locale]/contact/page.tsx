'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinAreaIcon,
  MicrosoftOutlookLogoIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

import WorkanaLogo from '@/components/Workana'

export default function Contact() {
  const t = useTranslations('Contact')

  return (
    <>
      <div className="mt-10 grid h-fit w-full grid-cols-1 gap-8 lg:min-h-[60svh] lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col space-y-20">
            <h1 className="text-4xl font-semibold lg:text-7xl">{t('title')}</h1>
            <p className="text-base lg:text-lg">{t('description')}</p>
          </div>

          <div className="mt-10 inline-flex w-full items-center space-x-6 lg:mt-0 lg:space-x-12">
            <span>{t('social')}:</span>
            <Link
              href="https://www.linkedin.com/in/inacio-rodrigues-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 rounded-full p-2 transition-all duration-300 hover:bg-white/20"
            >
              <LinkedinLogoIcon size={22} />
            </Link>
            <Link
              href="https://github.com/inacio-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 rounded-full p-2 transition-all duration-300 hover:bg-white/20"
            >
              <GithubLogoIcon size={22} />
            </Link>
            <Link
              href="https://www.workana.com/freelancer/d19115f803e41af80776e952d9e1bdd1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 rounded-full p-2 transition-all duration-300 hover:bg-white/20"
            >
              <WorkanaLogo />
            </Link>
          </div>
        </div>

        <div className="relative hidden overflow-hidden rounded-2xl lg:block">
          <Image
            src="/contact.png"
            alt={t('backgroundAlt')}
            className="object-cover opacity-50"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className="mt-10 grid h-fit w-full grid-cols-1 flex-col justify-between gap-4 lg:min-h-[15svh] lg:grid-cols-2 xl:grid-cols-3">
        <div className="border-header-button flex h-full flex-col items-start justify-start space-y-2 rounded-2xl border p-5 lg:p-10">
          <MicrosoftOutlookLogoIcon size={22} />
          <h3 className="font-semibold">{t('contactInfo.email.title')}</h3>
          <span className="text-sm text-gray-500">{t('contactInfo.email.value')}</span>
        </div>
        <div className="border-header-button flex h-full flex-col items-start justify-start space-y-2 rounded-2xl border p-5 lg:p-10">
          <WhatsappLogoIcon size={22} />
          <h3 className="font-semibold">{t('contactInfo.whatsapp.title')}</h3>
          <span className="text-sm text-gray-500">{t('contactInfo.whatsapp.value')}</span>
        </div>
        <div className="border-header-button flex h-full flex-col items-start justify-start space-y-2 rounded-2xl border p-5 lg:p-10">
          <MapPinAreaIcon size={22} />
          <h3 className="font-semibold">{t('contactInfo.location.title')}</h3>
          <span className="text-sm text-gray-500">{t('contactInfo.location.value')}</span>
        </div>
      </div>
    </>
  )
}
