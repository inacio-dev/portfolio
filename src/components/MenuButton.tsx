'use client'

import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { ListIcon } from '@phosphor-icons/react'

export default function MenuButton() {
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

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <div className="bg-header-button flex min-h-svh">123</div>
      </Drawer>
    </>
  )
}
