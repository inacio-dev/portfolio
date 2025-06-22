'use client'

import { SealQuestionIcon } from '@phosphor-icons/react'

export default function DoubtButton() {
  return (
    <>
      <button className="flex size-10 items-center justify-center rounded-full bg-white">
        <SealQuestionIcon color="black" size={22} />
      </button>
    </>
  )
}
