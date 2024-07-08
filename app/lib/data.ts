import { unstable_noStore as noStore } from 'next/cache';
import prismaClient from './prisma';
import { Prisma } from '@prisma/client';

// export type TeaNotesWithRegionType = Prisma.tea_notesGetPayload<{
//   include: { region: true };
// }>;

// export async function fetchTeaNotes(): Promise<TeaNotesWithRegionType[]> {
//   noStore();

//   return prismaClient.tea_notes.findMany({ include: { region: true } });
// }

export async function fetchTeaNotes() {
  noStore();

  return prismaClient.teaNote.findMany();
}
