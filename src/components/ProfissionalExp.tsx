'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ProfissionalExp() {
  const t = useTranslations('ProfessionalExperience')

  return (
    <>
      <div className="space-y-6">
        {/* B&Q Experience */}
        <div className="flex flex-col space-y-3">
          <Link
            href="https://beq.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 rounded transition-all duration-300 hover:bg-white/10"
          >
            <div className="relative flex size-12 items-center justify-center overflow-hidden rounded bg-blue-600 text-sm font-bold text-white">
              <Image src="/beqlogo.jpeg" width={48} height={48} alt="beq-logo" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-white">{t('bq.company')}</h3>
              <p className="text-xs text-gray-400">{t('bq.workType')}</p>
              <p className="text-xs text-gray-400">{t('bq.mode')}</p>
            </div>
          </Link>

          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="mt-2 size-2 rounded-full bg-gray-400"></div>
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-white">{t('bq.srDeveloper.title')}</h4>
                <p className="text-xs text-gray-400">{t('bq.srDeveloper.period')}</p>
                <p className="text-xs text-gray-400">{t('bq.srDeveloper.location')}</p>

                <div className="space-y-2 text-xs text-gray-300">
                  <p>{t('bq.srDeveloper.responsibilities.0')}</p>
                  <p>{t('bq.srDeveloper.responsibilities.1')}</p>
                  <p>{t('bq.srDeveloper.responsibilities.2')}</p>
                  <p>{t('bq.srDeveloper.responsibilities.3')}</p>
                  <p>{t('bq.srDeveloper.responsibilities.4')}</p>
                </div>

                <div className="mt-3">
                  <h5 className="mb-2 text-xs font-medium text-white">
                    {t('bq.srDeveloper.achievementsTitle')}
                  </h5>
                  <div className="space-y-1 text-xs text-gray-300">
                    <p>{t('bq.srDeveloper.achievements.0')}</p>
                    <p>{t('bq.srDeveloper.achievements.1')}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-xs text-gray-400">▼</span>
                  <span className="text-xs text-gray-300">{t('bq.srDeveloper.skills')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Junior Developer Position */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-start space-x-3">
            <div className="mt-2 size-2 rounded-full bg-gray-400"></div>
            <div className="flex-1 space-y-2">
              <h4 className="font-medium text-white">{t('bq.jrDeveloper.title')}</h4>
              <p className="text-xs text-gray-400">{t('bq.jrDeveloper.period')}</p>
              <p className="text-xs text-gray-400">{t('bq.jrDeveloper.location')}</p>

              <div className="space-y-2 text-xs text-gray-300">
                <p>{t('bq.jrDeveloper.responsibilities.0')}</p>
                <p>{t('bq.jrDeveloper.responsibilities.1')}</p>
                <p>{t('bq.jrDeveloper.responsibilities.2')}</p>
                <p>{t('bq.jrDeveloper.responsibilities.3')}</p>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <span className="text-xs text-gray-400">▼</span>
                <span className="text-xs text-gray-300">{t('bq.jrDeveloper.skills')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600" />

        {/* NEUROARQ Experience */}
        <div className="flex flex-col space-y-3">
          <Link
            href="https://neuro.arq.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 rounded transition-all duration-300 hover:bg-white/10"
          >
            <div className="relative flex size-12 items-center justify-center overflow-hidden rounded bg-white text-sm font-bold text-white">
              <Image src="/neuroarqlogo.png" width={40} height={40} alt="neuroarq-logo" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-white">{t('neuroarq.company')}</h3>
              <p className="text-xs text-gray-400">{t('neuroarq.period')}</p>
              <p className="text-xs text-gray-400">{t('neuroarq.mode')}</p>
            </div>
          </Link>

          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="mt-2 size-2 rounded-full bg-gray-400"></div>
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-white">{t('neuroarq.fullstack.title')}</h4>
                <p className="text-xs text-gray-400">{t('neuroarq.fullstack.period')}</p>

                <div className="space-y-2 text-xs text-gray-300">
                  <p>{t('neuroarq.fullstack.description')}</p>
                </div>

                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-xs text-gray-400">▼</span>
                  <span className="text-xs text-gray-300">{t('neuroarq.fullstack.skills')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
