import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import Form from './Form';

export const metadata: Metadata = {
  title: 'Create Note | Taste Notes'
};

export default async function CreateNotePage() {
  const regions = await prisma.regions.findMany();

  async function update(rating: number) {
    'use server';
    console.log('rating', rating);
  }

  return (
    <div className="mx-auto max-w-7xl px-4">
      <Form regions={regions} />
    </div>
  );
}
