'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/react';
import React from 'react';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';

const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' }
];

interface FiltersFormProps {
  className?: string;
}

export default function FiltersForm({ className }: FiltersFormProps) {
  const filters: any[] = [
    // {
    //   id: 'regions',
    //   name: 'Regions',
    //   options: regions.map(({ id, country, province }) => {
    //     return {
    //       value: id,
    //       label: `${country} ${province}`,
    //       checked: false
    //     };
    //   })
    // },
    {
      id: 'impression',
      name: 'Impression',
      options: [
        {
          value: '1',
          label: 'key',
          checked: false
        }
      ]
    }
  ];

  return (
    <form className={className}>
      <ul
        role="list"
        className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        {subCategories.map((category) => (
          <li key={category.name}>
            <a href={category.href}>{category.name}</a>
          </li>
        ))}
      </ul>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <FiMinus className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <GoPlus className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}
