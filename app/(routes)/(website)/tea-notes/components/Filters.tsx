import prismaClient from '@/lib/prisma';
import FiltersForm from './FiltersForm';

interface FiltersProps {
  className?: string;
}

export default function Filters({ className }: FiltersProps) {
  // const regions = await prismaClient.regions.findMany({
  //   orderBy: [{ country: 'asc' }]
  // });

  return <FiltersForm className={className} />;
}
