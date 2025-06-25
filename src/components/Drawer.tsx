'use client'

import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { XIcon } from '@phosphor-icons/react'

export default function Drawer({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                    >
                      <span className="absolute -inset-2.5" />
                      <XIcon aria-hidden="true" size={24} />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
