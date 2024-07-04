'use client';

import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel
} from '@headlessui/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import useScrollingUp from '../../hooks/useScrollingUp';

type NavLink = {
  label: string;
  href: string;
};

const leftMenu: NavLink[] = [
  {
    label: 'Notes',
    href: '/notes'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

const rightMenu: NavLink[] = [
  {
    label: 'Create Note',
    href: '/create-note'
  }
];

const mobilemenu = [...leftMenu, ...rightMenu];

export default function Navbar(props: any) {
  const isScrolledUp = useScrollingUp(100);
  const pathname = usePathname();

  return (
    <header
      className={clsx(
        'w-full bg-white px-8 py-5',
        'fixed z-50 transition-all ease-linear delay-150',
        isScrolledUp ? 'top-0' : '-top-20 lg:-top-28'
      )}
    >
      <nav>
        <>
          <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
            <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
              {leftMenu.map((item, index) => {
                return (
                  <Fragment key={`${item.label}${index}`}>
                    <Link
                      href={item.href}
                      key={`${item.label}${index}`}
                      className={clsx(
                        'px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500',
                        {
                          'text-blue-500': pathname === item.href
                        }
                      )}
                    >
                      {item.label}
                    </Link>
                  </Fragment>
                );
              })}
            </div>

            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/notes" className="w-28">
                <span className="block text-center">Taste Notes</span>
              </Link>

              <Menu>
                {({ open, close }) => (
                  <>
                    <MenuButton
                      aria-label="Toggle Menu"
                      className="px-2 py-1 text-gray-500 focus:text-blue-500 md:hidden"
                    >
                      {open && (
                        <AiOutlineClose className="h-6 w-6 fill-current" />
                      )}
                      {!open && (
                        <HiOutlineMenuAlt4 className="h-6 w-6 fill-current" />
                      )}
                    </MenuButton>

                    {/* <PopoverBackdrop className="fixed inset-0" /> */}

                    <PopoverPanelContent
                      open={open}
                      isScrolledUp={isScrolledUp}
                      close={close}
                    />
                  </>
                )}
              </Menu>
            </div>

            <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
              {rightMenu.map((item, index) => (
                <Fragment key={`${item.label}${index}`}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500',
                      {
                        'text-blue-500': true
                      }
                    )}
                  >
                    <span> {item.label}</span>
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        </>
      </nav>
    </header>
  );
}

function PopoverPanelContent({
  open,
  isScrolledUp,
  close
}: {
  isScrolledUp: boolean;
  open: boolean;
  close: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (open && !isScrolledUp) {
      console.log('close');

      close();
    }
  }, [close, isScrolledUp, open]);

  return (
    <MenuItems
      transition
      anchor="bottom"
      // className="bg-black z-50 divide-y divide-white/5 rounded-xl  text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      // className="mt-4 p-4  bg-red-500 z-50 divide-y [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 flex w-full flex-col items-center justify-start"
      className="z-50 bg-white mt-4 flex w-full flex-col items-center justify-start"
    >
      {mobilemenu.map((item, index) => (
        <MenuItem key={`${item.label}${index}`}>
          <Link
            href={item.href}
            key={`${item.label}${index}`}
            className="w-full px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500"
          >
            {item.label}
          </Link>
        </MenuItem>
      ))}
    </MenuItems>
  );
}
