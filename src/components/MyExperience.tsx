'use client'

import { useState } from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'

import Drawer from './Drawer'

export default function MyExperience() {
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
        <span>Ver Experiência</span>
        <ArrowRightIcon size={22} />
      </button>

      <Drawer open={open} setOpen={setOpen}>
        <></>
      </Drawer>
    </>
  )
}
