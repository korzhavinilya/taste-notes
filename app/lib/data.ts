import { unstable_noStore as noStore } from 'next/cache';
import prismaClient from './prisma';

export async function fetchTeaNotes() {
  noStore();
  
  return prismaClient.tea_notes.findMany({ include: { region: true } });
}
