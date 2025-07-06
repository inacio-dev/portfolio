'use client'

import { useState } from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

import AcademicExp from './AcademicExp'
import Drawer from './Drawer'
import ProfissionalExp from './ProfissionalExp'

export default function MyExperience() {
  const t = useTranslations('MyExperience')
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="bg-header-button/70 hover:bg-header inline-flex items-center justify-center space-x-2 rounded-full px-6 py-2 text-start text-xs transition-all duration-300 lg:text-base"
      >
        <span>{t('viewExperience')}</span>
        <ArrowRightIcon size={22} />
      </button>

      <Drawer open={open} setOpen={setOpen}>
        <div className="flex w-full flex-col items-center justify-center space-y-6">
          <div className="collapse-arrow bg-header-button collapse border border-slate-50/20 text-white">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">{t('professional')}</div>
            <div className="collapse-content text-sm">
              <ProfissionalExp />
            </div>
          </div>
          <div className="collapse-arrow bg-header-button collapse border border-slate-50/20 text-white">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">{t('academic')}</div>
            <div className="collapse-content text-sm">
              <AcademicExp />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}
