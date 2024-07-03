'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi2';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push('/notes');
  }, [router]);

  return null;

  // return <Loading/>

  // return (
  // <div className="flex flex-col gap-4">
  {
    /* Website */
  }
  {
    /* <CardComponent
        title="Tea"
        subtitle="Commodo qui nisi id fugiat officia."
      />
      <CardComponent
        title="Coffee"
        subtitle="Exercitation culpa in cillum ipsum."
      />
      <CardComponent
        title="Wine"
        subtitle="Id veniam elit dolor cupidatat adipisicing."
      />
      <CardComponent
        title="Beer"
        subtitle="Quis velit eiusmod qui fugiat commodo consectetur esse nulla reprehenderit esse et enim."
      />
      <CardComponent
        title="Chocolate"
        subtitle="Nisi culpa labore cillum nostrud labore ad enim adipisicing tempor dolor consectetur."
      />
      <CardComponent
        title="Cheese"
        subtitle="Ea laborum nostrud reprehenderit nisi tempor esse ex enim aute ad excepteur."
      />
      <CardComponent
        title="Tobacco"
        subtitle="Esse mollit sint do consectetur in amet labore."
      /> */
  }
  // </div>
  // );
}

const CardComponent = ({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={clsx(
        'border rounded-2xl flex items-center justify-between p-4 cursor-pointer',
        {
          'bg-brown-light border-brown-normal text-brown-normal': isSelected
        },
        {
          'bg-white border-surface-light-active text-grey-normal-active':
            !isSelected
        }
      )}
      onClick={toggleSelection}
    >
      <div className="flex flex-col">
        <div className="text-xl">{title}</div>
      </div>

      <HiOutlinePlus
        fontSize={20}
        className={clsx({
          'text-brown-normal': isSelected
        })}
      />
    </div>
  );
};
