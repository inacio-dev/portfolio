'use client'

import { UserIcon } from '@phosphor-icons/react'

export default function ProfileButton() {
  return (
    <>
      <button className="inline-flex items-center justify-center space-x-2 rounded-full bg-black px-4 py-2">
        <UserIcon size={22} />
        <span>Sobre</span>
      </button>
    </>
  )
}
