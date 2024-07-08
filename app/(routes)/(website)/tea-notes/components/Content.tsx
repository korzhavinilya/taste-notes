'use client';

import { PiFunnelLight, PiSquaresFourThin } from 'react-icons/pi';
import Filters from './Filters';
import MobileFilters from './MobileFilters';
import SortMenu from './SortMenu';
import TeaNoteList from './TeaNoteList';
import Pagination from './Pagination';
import { TeaNote } from 'prisma/prisma-client';
import { useState } from 'react';

interface TeaNotesContentProps {
  // teaNotes: TeaNotesWithRegionType[];
  teaNotes: TeaNote[];
}

export default function TeaNotesContent({ teaNotes }: TeaNotesContentProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <MobileFilters
        open={mobileFiltersOpen}
        // open={true}
        className="lg:hidden"
        handleClose={() => setMobileFiltersOpen(false)}
        // handleClose={() => {}}
      >
        <Filters className="py-6 border-t border-gray-200 px-5" />
      </MobileFilters>

      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Чай</h1>

        <div className="flex items-center">
          <SortMenu />

          <button
            type="button"
            className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
          >
            <span className="sr-only">View grid</span>
            <PiSquaresFourThin className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            // className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
            onClick={() => setMobileFiltersOpen(true)}
            // onClick={() => {}}
          >
            <span className="sr-only">Filters</span>
            <PiFunnelLight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <Filters className="hidden lg:block" />

          <div className="lg:col-span-3">
            <TeaNoteList teaNotes={teaNotes} />

            <Pagination />
          </div>
        </div>
      </section>
    </>
  );
}
