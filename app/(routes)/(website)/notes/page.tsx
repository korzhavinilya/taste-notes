import { Metadata } from 'next';
import { fetchTeaNotes } from '../../../lib/data';
import { Button } from '../../../components/Button';
import { ButtonLink } from '../../../components/ButtonLink';
import NoteCard from './components/NoteCard';
import Rating from './components/Rating';

export const metadata: Metadata = {
  title: 'Notes | Taste Notes'
};

export default async function NotesPage() {
  const teaNotes = await fetchTeaNotes();
  console.log('teaNotes', teaNotes);

  return (
    // <section className="h-full max-w-6xl mx-auto sm:px-6 lg:px-4">
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
    //     {teaNotes.map((teaNote) => (
    //       <NoteCard key={teaNote.id} teaNote={teaNote} />
    //     ))}
    //   </div>
    // </section>

    <div className="mx-auto max-w-7xl px-4">
      <ul role="list" className="divide-y divide-gray-100">
        {teaNotes.map((teaNote) => (
          <li key={teaNote.name} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {teaNote.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {teaNote.type}
                </p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <p className="text-sm leading-6 text-gray-900">
                {teaNote.region.country} | {teaNote.region.province}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {teaNote.price || 0} BYN
              </p>
              <Rating rating={teaNote.rating || 0} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
