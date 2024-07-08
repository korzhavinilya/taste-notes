import prismaClient from '@/lib/prisma';
import DefaultProductPageContent from './components/DefaultProductPageContent';
import { auth } from '@/auth';
import assert from 'assert';

export default async function DefaultProductPage() {
  const session = await auth();
  assert(session?.user);
  const { defaultProduct } = session?.user;

  const products = await prismaClient.product.findMany();

  console.log('DefaultProductPage', session);

  return (
    <>
      <div className="mt-10 font-semibold text-center">
        <h1 className="text-3xl">Set Your Default Product</h1>
        <p className="text-base text-black/45">
          Select the product category you want to see by default. Don&apos;t
          worry, you can change this later in your profile settings.
        </p>
      </div>

      <DefaultProductPageContent
        defaultProduct={defaultProduct}
        products={products}
        className="mt-12"
      />
    </>
  );
}
