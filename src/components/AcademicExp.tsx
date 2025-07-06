'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function AcademicExp() {
  const t = useTranslations('AcademicExperience')

  return (
    <>
      <div className="space-y-6">
        {/* UFC Experience */}
        <div className="flex flex-col space-y-3">
          <Link
            href="https://www.ufc.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 rounded transition-all duration-300 hover:bg-white/10"
          >
            <div className="relative flex size-12 items-center justify-center overflow-hidden rounded bg-white text-sm font-bold text-white">
              <Image
                src="/ufclogo.png"
                width={22}
                height={22}
                alt="ufc-logo"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-white">{t('ufc.university')}</h3>
              <p className="text-xs text-gray-400">{t('ufc.degree')}</p>
              <p className="text-xs text-gray-400">{t('ufc.period')}</p>
            </div>
          </Link>

          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="mt-2 size-2 rounded-full bg-gray-400"></div>
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-white">{t('ufc.computerEngineering.title')}</h4>
                <p className="text-xs text-gray-400">{t('ufc.computerEngineering.period')}</p>

                <div className="space-y-2 text-xs text-gray-300">
                  <p>{t('ufc.computerEngineering.status')}</p>
                  <p>{t('ufc.computerEngineering.activities.0')}</p>
                  <p>{t('ufc.computerEngineering.activities.1')}</p>
                  <p>{t('ufc.computerEngineering.activities.2')}</p>
                </div>

                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-xs text-gray-400">▼</span>
                  <span className="text-xs text-gray-300">
                    {t('ufc.computerEngineering.skills')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600" />

        {/* High School Experience */}
        <div className="flex flex-col space-y-3">
          <Link
            href="https://www.lourencofilho.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 rounded transition-all duration-300 hover:bg-white/10"
          >
            <div className="relative flex size-12 items-center justify-center overflow-hidden rounded bg-white text-sm font-bold text-white">
              <Image src="/lourencologo.png" width={30} height={20} alt="ufc-logo" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-white">{t('highSchool.school')}</h3>
              <p className="text-xs text-gray-400">{t('highSchool.level')}</p>
              <p className="text-xs text-gray-400">{t('highSchool.period')}</p>
            </div>
          </Link>

          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="mt-2 size-2 rounded-full bg-gray-400"></div>
              <div className="flex-1 space-y-2">
                <p className="text-xs text-gray-300">{t('highSchool.description')}</p>

                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-xs text-gray-400">▼</span>
                  <span className="text-xs text-gray-300">{t('highSchool.skills')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
