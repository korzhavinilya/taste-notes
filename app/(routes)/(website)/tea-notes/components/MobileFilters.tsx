'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import clsx from 'clsx';
import { IoCloseOutline } from 'react-icons/io5';
import Filters from './Filters';
import { useState } from 'react';
import { PiFunnelLight } from 'react-icons/pi';

interface MobileFiltersProps {
  open: boolean;
  className?: string;
  children: React.ReactNode;
  handleClose: () => void;
}

export default function MobileFilters({
  open,
  className,
  children,
  handleClose
}: MobileFiltersProps) {
  // const [open, setMobileFiltersOpen] = useState(true);

  // function handleClose() {
  //   setMobileFiltersOpen(false);
  // }

  return (
    <div className={className}>
      {/* <button
        type="button"
        // className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        <PiFunnelLight className="h-5 w-5" aria-hidden="true" />
      </button> */}

      <Dialog
        className={clsx('relative z-40 ', className)}
        open={open}
        onClose={handleClose}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4 pb-3">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={handleClose}
              >
                <span className="sr-only">Close menu</span>
                <IoCloseOutline className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* <Filters className="py-6 border-t border-gray-200 px-5" /> */}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
