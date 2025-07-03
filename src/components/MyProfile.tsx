'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LinkedinLogoIcon, MapPinIcon, UserIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

import { GitHubStats } from '@/lib/fetchGitHubStats'

import Drawer from './Drawer'
import GitHubStatsContent from './GitHubStats'

export default function MyProfile({ githubStats }: { githubStats: GitHubStats }) {
  const t = useTranslations('MyProfile')
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="inline-flex items-center justify-center space-x-2 rounded-full bg-black px-4 py-2 transition-all duration-300 hover:bg-white/20"
      >
        <UserIcon size={22} />
        <span>{t('about')}</span>
      </button>

      <Drawer open={open} setOpen={setOpen}>
        <div className="flex w-full flex-col items-center justify-center space-y-6">
          <div className="inline-flex w-full items-center justify-center space-x-10">
            <div className="relative size-28 min-w-28 overflow-hidden rounded-full">
              <Image src="/profile.jpeg" fill sizes="100vw" alt={t('profileAlt')} />
            </div>

            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-bold">{t('name')}</h1>
              <p className="text-sm">{t('title')}</p>
            </div>
          </div>

          <div className="inline-flex w-full items-center justify-between space-x-10">
            <div className="inline-flex space-x-2">
              <MapPinIcon size={22} />
              <span>{t('location')}</span>
            </div>

            <Link
              href="https://www.linkedin.com/in/inacio-rodrigues-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 rounded-full bg-white px-4 py-1 text-start text-xs text-black transition-all duration-300 hover:bg-white/70 lg:text-base"
            >
              <LinkedinLogoIcon size={22} weight="bold" />
              <span>{t('connect')}</span>
            </Link>
          </div>

          <GitHubStatsContent githubStats={githubStats} />

          <div className="collapse-arrow bg-header-button collapse border border-slate-50/20 text-white">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">{t('accordion.profile.title')}</div>
            <div className="collapse-content text-sm">{t('accordion.profile.content')}</div>
          </div>
          <div className="collapse-arrow bg-header-button collapse border border-slate-50/20 text-white">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">{t('accordion.skills.title')}</div>
            <div className="collapse-content text-sm">{t('accordion.skills.content')}</div>
          </div>
          <div className="collapse-arrow bg-header-button collapse border border-slate-50/20 text-white">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">{t('accordion.education.title')}</div>
            <div className="collapse-content text-sm">{t('accordion.education.content')}</div>
          </div>
        </div>
      </Drawer>
    </>
  )
}
