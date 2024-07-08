import { auth } from '@/auth';
import { getProductManifest } from '@/constants/product-pages.manifest';
import assert from 'assert';
import { redirect } from 'next/navigation';

export default async function WebsitePage() {
  console.log('WebsitePage');

  const session = await auth();

  const defaultPage = session?.user?.defaultProduct;

  if (!defaultPage) {
    redirect('/set-default-product');
  }

  if (defaultPage) {
    const pageManifest = getProductManifest(defaultPage);
    assert(pageManifest);

    redirect(pageManifest.path);
  }

  return null;
}
