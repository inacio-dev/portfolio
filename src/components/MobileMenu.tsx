'use client'

import { useState } from 'react'
import { ListIcon } from '@phosphor-icons/react'

import Drawer from './Drawer'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="bg-header-button flex size-12 items-center justify-center rounded-full"
      >
        <ListIcon size={22} weight="bold" />
      </button>

      <Drawer open={open} setOpen={setOpen}>
        <></>
      </Drawer>
    </>
  )
}
