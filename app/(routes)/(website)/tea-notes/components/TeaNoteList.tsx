import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GiTeapotLeaves } from 'react-icons/gi';
import DeleteButton from './DeleteButton';
import TeaNotesMenu from './TeaNotesMenu';
import { TeaNote } from 'prisma/prisma-client';

interface TeaNotesContentProps {
  teaNotes: TeaNote[];
}

export default function TeaNoteList({ teaNotes }: TeaNotesContentProps) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {teaNotes.map((teaNote) => (
        <li key={teaNote.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto flex flex-col justify-center">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {teaNote.name}
              </p>
              {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {teaNote.impression}
              </p> */}
            </div>
          </div>

          <div className="flex justify-center items-center gap-6">
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">{teaNote.type}</p> */}
              {/* <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen
                <time dateTime={new Date().getDate()}>
                  {new Date().toISOString()}
                </time>
              </p> */}
              <div className="mt-1 flex items-center gap-x-1.5">
                {/* <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div> */}
                {/* <p className="text-xs leading-5 text-gray-500">
                  {' '}
                  {teaNote.region.country} | {teaNote.region.province}
                </p> */}
              </div>
            </div>

            <TeaNotesMenu />
          </div>
        </li>
      ))}
    </ul>
  );
}
