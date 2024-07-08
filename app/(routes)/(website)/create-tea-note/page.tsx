import { Metadata } from 'next';
import TeaForm from './components/TeaForm';
import prismaClient from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Create Tea Note | Taste Notes',
};

export default async function CreateNotesPage() {
  const regions = await prismaClient.regions.findMany();

  return <TeaForm regions={regions} />;
}
