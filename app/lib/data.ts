import prisma from './prisma';

export async function fetchTeaNotes() {
  return prisma.tea_notes.findMany({ include: { region: true } });
}
