import { auth, signOut, update } from '@/auth';
import ClientSessionUpdateButton from './components/ClientSessionUpdateButton';

export default async function HomePage() {
  const session = await auth();
  const user = session!.user;

  console.log('Server Side Rendering');
  // console.log('HomePage.session', session);

  return (
    <div>
      <h1>Server Side Rendering</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <br />

      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="border border-black">Log Out</button>
      </form>

      <ClientSessionUpdateButton newName={'Server-Man'} />

      <br />

      <form
        action={async () => {
          'use server';
          await update({ ...user, name: 'Serverserver-man' } as any);
        }}
      >
        <button className="border border-black">Server Side Update</button>
      </form>
    </div>
  );
}
