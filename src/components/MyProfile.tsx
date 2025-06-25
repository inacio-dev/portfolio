'use client'

import { useState } from 'react'
import { UserIcon } from '@phosphor-icons/react'

import Drawer from './Drawer'

export default function MyProfile() {
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="inline-flex items-center justify-center space-x-2 rounded-full bg-black px-4 py-2"
      >
        <UserIcon size={22} />
        <span>Sobre</span>
      </button>

      <Drawer open={open} setOpen={setOpen}>
        <></>
      </Drawer>
    </>
  )
}
