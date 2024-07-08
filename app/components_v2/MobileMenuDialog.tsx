'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { GoChevronDown } from 'react-icons/go';
import { signOut } from 'next-auth/react';

interface Props {
  open: boolean;
  className?: string;
  handleClose: () => void;
}

export default function MobileMenuDialog({
  open,
  className,
  handleClose
}: Props) {
  return (
    <Dialog
      className={clsx('relative', className)}
      open={open}
      onClose={handleClose}
    >
      <DialogBackdrop
        transition
        className="bg-black/15 fixed inset-0 -z-10 transition-opacity duration-150 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="bg-white w-9/12 sm:max-w-96 ml-auto pt-20 pl-14 pb-14
           transition duration-150 ease-in-out data-[closed]:translate-x-full"
        >
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-14">
              <ul className="font-semibold space-y-4 text-base">
                <li>
                  <Link href="#">Add Note</Link>
                </li>

                <li>
                  <Link href="#">Archive</Link>
                </li>

                <Disclosure as="li" defaultOpen={false}>
                  <DisclosureButton className="group flex items-center justify-between gap-8">
                    Products
                    <GoChevronDown className="size-5 transition-transform duration-150 ease-out group-data-[open]:rotate-180" />
                  </DisclosureButton>

                  <DisclosurePanel
                    transition
                    className="mt-2 text-sm/5 transition duration-50 ease-out data-[closed]:opacity-0 overflow-hidden"
                  >
                    <ul className="pl-2 space-y-3 text-sm text-black/75 overflow-y-auto max-h-64">
                      <li>
                        <Link href="#">Tea</Link>
                      </li>
                      <li>
                        <Link href="#">Coffee</Link>
                      </li>
                      <li>
                        <Link href="#">Wine</Link>
                      </li>
                      <li>
                        <Link href="#">Beer</Link>
                      </li>
                      <li>
                        <Link href="#">Cheese</Link>
                      </li>
                    </ul>
                  </DisclosurePanel>
                </Disclosure>
              </ul>

              <ul className="font-semibold space-y-4 text-base">
                <Link href="#">Community</Link>
              </ul>

              <ul className="font-semibold space-y-4 text-base">
                <li>
                  <Link href="#">Import Notes</Link>
                </li>

                <li>
                  <Link href="#">Export Notes</Link>
                </li>
              </ul>
            </div>

            <ul className="font-semibold space-y-4 text-base">
              <Link href="#">Account Settings</Link>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
