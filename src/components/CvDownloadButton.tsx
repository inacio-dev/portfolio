'use client'

import { DownloadIcon } from '@phosphor-icons/react'

export default function CvDownloadButton() {
  return (
    <>
      <button className="bg-header-button inline-flex items-center justify-center space-x-2 rounded-full px-4 py-2">
        <span>Curriculo</span>
        <DownloadIcon />
      </button>
    </>
  )
}
