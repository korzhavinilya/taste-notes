'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteButton from './DeleteButton';

interface TeaNotesMenuProps {}

export default function TeaNotesMenu({}: TeaNotesMenuProps) {
  return (
    <Menu>
      <MenuButton className="text-gray-400 data-[hover]:text-gray-600 data-[open]:text-gray-600">
        <BsThreeDotsVertical className="size-4 " />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-32 origin-top-right rounded-md border shadow-md bg-white py-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {/* <MenuItem>
      <button className="flex w-full items-center gap-2 py-1.5 px-2 hover:bg-gray-100">
        Edit
      </button>
    </MenuItem> */}

        <MenuItem>
          {/* <button className="flex w-full items-center gap-2 py-1.5 px-2 hover:bg-gray-100">
        Delete
      </button> */}

          {/* <DeleteButton noteId={noteId} /> */}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
