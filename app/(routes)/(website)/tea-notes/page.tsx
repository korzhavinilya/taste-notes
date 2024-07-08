import { fetchTeaNotes } from '@/lib/data';
import TeaNotesContent from './components/Content';

export default async function TeaNotesPage() {
  const teaNotes = await fetchTeaNotes();

  // return <TeaNotesContent teaNotes={teaNotes} />;

  return (
    <>
      <div className="mt-10 font-semibold text-center">
        <h1 className="text-3xl">Tea Notes</h1>
      </div>

      <ul className="w-full lg:w-1/2 mt-12 mx-auto space-y-4">
        <li>
          <Card />
        </li>

        <li>
          <Card />
        </li>
      </ul>
    </>
  );
}

function Card() {
  return (
    <div className="text-base border border-gray-normal rounded-lg p-5">
      <div>
        <span className="font-semibold">Дянь Хун Мао Фэн</span>
        <p className="mt-2 text-gray-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          voluptatum tenetur illo ipsam.
        </p>
      </div>

      <div className="mt-2 flex justify-between text-gray-light">
        <span>Тайвань, улун</span>
        <span>Создан 04/22</span>
      </div>
    </div>
  );
}
