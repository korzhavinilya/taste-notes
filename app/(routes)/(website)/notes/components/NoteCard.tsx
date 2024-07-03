import { tea_notes } from '@prisma/client';
import Image from 'next/image';
import Rating from './Rating';

export default function NoteCard({ teaNote }: { teaNote: tea_notes }) {
  return (
    <div className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
      <Rating
        className="absolute top-0 right-0 mr-2 mt-2"
        rating={teaNote.rating}
      />

      <Image
        className="object-center object-cover h-auto w-full"
        src="https://tea-mail.by/wa-data/public/shop/products/60/49/4960/images/50038/50038.750.jpg"
        width={0}
        height={0}
        sizes="100vw"
        alt="photo"
      />
      <div className="text-center py-8 sm:py-6">
        <p className="text-xl text-gray-700 font-bold mb-2">{teaNote.name}</p>
        <p className="text-base text-gray-400 font-normal">{teaNote.type}</p>
      </div>
    </div>
  );
}
