'use client'

import Link from 'next/link'
import { GithubLogoIcon } from '@phosphor-icons/react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'

import { GitHubStats } from '@/lib/fetchGitHubStats'

export default function GitHubStatsContent({ githubStats }: { githubStats: GitHubStats }) {
  const t = useTranslations('GitHubStats')

  const statItems_one = [
    { label: t('commits'), value: githubStats.commits },
    { label: t('repositories'), value: githubStats.repositories },
    { label: t('pullRequests'), value: githubStats.pullRequests },
    { label: t('languages'), value: githubStats.languages },
  ]

  const statItems_two = [
    { label: t('contributions'), value: githubStats.contributions },
    { label: t('followers'), value: githubStats.followedBy },
    { label: t('following'), value: githubStats.following },
    { label: t('watching'), value: githubStats.watching },
  ]

  const [emblaRef_one] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  )
  const [emblaRef_two] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  )

  return (
    <div className="inline-flex w-full max-w-full items-center justify-between space-x-3">
      <Link
        href="https://github.com/inacio-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center space-x-2 rounded-full px-2 py-2 transition-all duration-300 hover:bg-white/20 lg:text-base"
      >
        <GithubLogoIcon size={22} />
      </Link>

      <div className="w-px self-stretch bg-gray-300" />

      <div className="relative max-w-[150px] min-w-0">
        <div className="overflow-hidden" ref={emblaRef_one}>
          <div className="flex">
            {statItems_one.map((item, index) => (
              <div
                key={index}
                className="flex min-w-0 flex-[0_0_100%] flex-col items-center justify-center py-1 text-center"
              >
                <span className="text-base leading-tight font-bold">{item.value}</span>
                <span className="max-w-full truncate text-xs leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative max-w-[150px] min-w-0">
        <div className="overflow-hidden" ref={emblaRef_two}>
          <div className="flex">
            {statItems_two.map((item, index) => (
              <div
                key={index}
                className="flex min-w-0 flex-[0_0_100%] flex-col items-center justify-center py-1 text-center"
              >
                <span className="text-base leading-tight font-bold">{item.value}</span>
                <span className="max-w-full truncate text-xs leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
