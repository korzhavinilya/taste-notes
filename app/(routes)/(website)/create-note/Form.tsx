'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import clsx from 'clsx';
import { useFormState, useFormStatus } from 'react-dom';
import { createTeaNote } from '../../../lib/actions';
import { Field, Input, Label, Select, Textarea } from '@headlessui/react';
import ErrorMessage from '../../../components/FormFields/ErrorMessage';
import { regions, tea_type } from '@prisma/client';
import Rating from './RatingCOmponent/Rating';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { HiOutlineArrowSmRight } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const steps = [
  {
    label: 'Basic Info'
  },
  {
    label: 'Appearance & Aroma'
  },
  {
    label: 'Infusion & Taste'
  },
  {
    label: 'Rating'
  }
];

interface FormProps {
  regions: regions[];
}

export default function Form({ regions }: FormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const [errors, dispatch] = useFormState(createTeaNote, {});
  console.log('errors', errors);

  const handleSlideTo = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleBack = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveStep(swiper.activeIndex);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: string) {
      return <div className={className}>{index}</div>;
    }
  };

  return (
    <form action={dispatch} className="flex flex-col gap-4 w-full">
      <nav aria-label="progress">
        <ul role="list" className="flex space-x-8">
          {steps.map(({ label }, index) => {
            const isActive = index === activeStep;

            return (
              <li
                key={index}
                className={clsx(
                  'flex-1 cursor-pointer flex flex-col border-b-2 group',
                  {
                    'border-transparent hover:font-medium': !isActive,
                    'border-gray-500': isActive
                  }
                )}
              >
                <button
                  type="button"
                  className={clsx('text-xs', {
                    'font-thin group-hover:font-medium': !isActive,
                    'font-medium': isActive
                  })}
                  onClick={() => handleSlideTo(index)}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <Swiper
        ref={swiperRef}
        className="h-fit z-10 w-full"
        modules={[Navigation, Pagination, Mousewheel]}
        // direction={'vertical'}
        onSlideChange={handleSlideChange}
        // navigation
        // pagination={{ clickable: true }}
        // mousewheel={true}
        // slidesPerView={1}
        spaceBetween={30}
      >
        <SwiperSlide tabIndex={1}>
          <div className="grid grid-cols-4 gap-4">
            <Field className="col-span-full flex flex-col">
              <Label>Name</Label>
              <Input name="name" className="rounded-lg px-3" />
              <ErrorMessage message={errors['name']} />
            </Field>

            <Field className="col-span-2">
              <Label>Group</Label>
              <div className="relative">
                <Select name="type" className="w-full rounded-lg px-3">
                  <option value=""></option>
                  {Object.keys(tea_type).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>
            </Field>

            <Field className="col-span-2">
              <Label>Region</Label>
              <div className="relative">
                <Select name="region_id" className="w-full rounded-lg px-3">
                  <option value=""></option>
                  {regions?.map(({ id, country, province }) => (
                    <option key={id} value={id}>
                      {country}, {province}
                    </option>
                  ))}
                </Select>
              </div>
            </Field>

            <Field className="col-span-full flex flex-col">
              <Label>Appearance</Label>
              <Textarea
                name="appearance"
                className="rounded-lg px-3"
                rows={4}
              />
            </Field>

            <Field className="col-span-2">
              <Label>Price</Label>
              <div className="relative">
                <Input
                  name="price"
                  className="w-full rounded-lg pr-12"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <div className="pointer-events-none absolute top-2 right-0 flex items-center pr-3">
                  <span className="text-gray-500">BYN</span>
                </div>
              </div>
            </Field>
          </div>
        </SwiperSlide>

        <SwiperSlide tabIndex={2}>2</SwiperSlide>

        <SwiperSlide tabIndex={3}>3</SwiperSlide>

        <SwiperSlide tabIndex={4}>
          <Rating defaultValue={0} />
        </SwiperSlide>
      </Swiper>

      <div className="mt-4 flex">
        {activeStep !== 0 && (
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg border-2 border-black hover:bg-gray-200/50 font-medium text-sm py-2 px-6"
            onClick={handleBack}
          >
            <HiOutlineArrowSmLeft />
            Back
          </button>
        )}

        {activeStep != steps.length - 1 ? (
          <button
            type="button"
            className="ml-auto flex items-center gap-1 rounded-lg border-2 border-transparent bg-black hover:bg-black/90 text-white font-medium text-sm py-2 px-6"
            onClick={handleNext}
          >
            Next
            <HiOutlineArrowSmRight />
          </button>
        ) : (
          <SubmitButton />
        )}
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        'ml-auto flex items-center gap-1 rounded-lg border-2 border-transparent bg-black hover:bg-black/90 text-white font-medium text-sm py-2 px-6'
      )}
      disabled={pending}
    >
      Create Note
      {pending ? (
        <VscLoading className="animate-spin h-5 w-5 text-white" />
      ) : (
        <HiOutlineArrowSmRight />
      )}
    </button>
  );
}
