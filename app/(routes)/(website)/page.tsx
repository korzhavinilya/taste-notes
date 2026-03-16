import { auth } from '@/auth';

export default async function WebsitePage() {
  console.log('WebsitePage');

  const session = await auth();

  return (
    <>
      <h1>Root Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
