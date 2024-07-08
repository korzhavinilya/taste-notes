'use client';

import React, { useOptimistic, useTransition } from 'react';
import { HiOutlineArrowSmRight, HiOutlinePhotograph } from 'react-icons/hi';
import { FaRegUserCircle } from 'react-icons/fa';
import { impression, regions, tea_type } from '@prisma/client';
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  FieldPath,
  FormProvider
} from 'react-hook-form';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { createTeaNote } from '@/lib/actions';
import { TeaNoteSchema } from '@/lib/zod/schemas';
import { VscLoading } from 'react-icons/vsc';

interface TeaFormProps {
  regions: regions[];
}

export default function TeaForm({ regions }: TeaFormProps) {
  const formMethods = useForm<TeaNoteSchema>({
    mode: 'onChange',
    resolver: zodResolver(TeaNoteSchema),
    shouldUseNativeValidation: false
  });

  const {
    formState: { isValid, errors },
    handleSubmit,
    register,
    setError,
    reset
  } = formMethods;

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      reset();

      console.log('start');

      const response = await createTeaNote(data);

      console.log('end');

      if (response?.status === 'error') {
        alert(response?.message);

        response.errors?.forEach((error) => {
          setError(error.path as FieldPath<TeaNoteSchema>, {
            message: error.message
          });
        });
      }
    });
  });

  return (
    <form className="mx-auto max-w-2xl" onSubmit={onSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Basic info
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis harum
            voluptate fugiat placeat molestias omnis, in obcaecati provident
            error eligendi voluptatem aperiam. Corrupti iste commodi optio, eum
            impedit repellendus perspiciatis?
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>

              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <span className="text-red-500 font-semibold text-sm">
                  <ErrorMessage name="name" errors={errors} />
                </span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="group"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Group
              </label>

              <div className="mt-2">
                <select
                  id="group"
                  {...register('type')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value=""></option>
                  {Object.keys(tea_type).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <span className="text-red-500 font-semibold text-sm">
                  <ErrorMessage name="type" errors={errors} />
                </span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Region
              </label>

              <div className="mt-2">
                <select
                  id="region"
                  {...register('region_id')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value=""></option>
                  {regions?.map(({ id, country, province }) => (
                    <option key={id} value={id}>
                      {country}_{province}
                    </option>
                  ))}
                </select>

                <span className="text-red-500 font-semibold text-sm">
                  <ErrorMessage name="region_id" errors={errors} />
                </span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>

              <div className="mt-2 relative">
                <input
                  id="price"
                  type="text"
                  {...register('price')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <div className="pointer-events-none absolute top-2 right-0 pr-3">
                  <span className="text-gray-400">BYN</span>
                </div>
              </div>

              <span className="text-red-500 font-semibold text-sm">
                <ErrorMessage name="price" errors={errors} />
              </span>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="appearance"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Appearance
              </label>

              <div className="mt-2">
                <textarea
                  id="appearance"
                  {...register('appearance')}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <span className="text-red-500 font-semibold text-sm">
                <ErrorMessage name="appearance" errors={errors} />
              </span>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about tea appearance.
              </p>
            </div>

            <fieldset className="col-span-full">
              <legend className="text-sm font-medium leading-6 text-gray-900">
                Impression
              </legend>

              <div className="mt-6 flex gap-6">
                {Object.keys(impression).map((value) => {
                  const inputId = `impression: ${value}`;
                  return (
                    <div key={value} className="flex items-center gap-x-3">
                      <input
                        id={inputId}
                        type="radio"
                        {...register('impression')}
                        value={value}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />

                      <label
                        htmlFor={inputId}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>

              <span className="text-red-500 font-semibold text-sm">
                <ErrorMessage name="impression" errors={errors} />
              </span>
            </fieldset>

            {/* <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <FaRegUserCircle
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <HiOutlinePhotograph
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Appearance & Aroma
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim id
            tempora, sunt numquam eius, accusamus maiores architecto dolorem
            similique dolorum neque sit molestiae sint eveniet sapiente voluptas
            nam harum facere?
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            ...
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Infusion & Taste
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            nisi sit, temporibus dolorem cum deleniti iure quisquam maxime.
            Ratione atque sint perspiciatis accusantium quaerat illo quam esse,
            itaque labore voluptas!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            ...
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Rating
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            nisi sit, temporibus dolorem cum deleniti iure quisquam maxime.
            Ratione atque sint perspiciatis accusantium quaerat illo quam esse,
            itaque labore voluptas!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            ...
          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Appearance & Aroma
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim id
            tempora, sunt numquam eius, accusamus maiores architecto dolorem
            similique dolorum neque sit molestiae sint eveniet sapiente voluptas
            nam harum facere?
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Infusion & Taste
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            nihil provident placeat totam nobis, animi officia dolor
            necessitatibus distinctio eveniet expedita vel. Repudiandae hic,
            quaerat delectus nam veritatis dolor perspiciatis?
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Push Notifications
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div> */}
      </div>

      {/* Buttons */}
      <div className="mt-4">
        {/* <SubmitButton /> */}

        <button
          type="submit"
          className="ml-auto flex items-center gap-1 rounded-lg border-2 border-transparent bg-black hover:bg-black/90 text-white font-medium text-sm py-2 px-6 disabled:bg-black/70 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          Create Note
          {isPending && (
            <VscLoading className="animate-spin h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>

        <button
          type="submit"
          className="ml-auto flex items-center gap-1 rounded-lg border-2 border-transparent bg-black hover:bg-black/90 text-white font-medium text-sm py-2 px-6"
        >
          Create Note
        </button>
      </div> */}
    </form>
    // </FormProvider>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="ml-auto flex items-center gap-1 rounded-lg border-2 border-transparent bg-black hover:bg-black/90 text-white font-medium text-sm py-2 px-6 disabled:bg-black/70 disabled:cursor-not-allowed"
      disabled={pending}
    >
      Create Note
      {pending && <VscLoading />}
    </button>
  );
}

// export default function Form() {
//   const [clientSideValidation, setClientSideValidation] = useState(true);
// const {
//   register,
//   formState: { isValid, errors },
//   setError,
//   reset
// } = useForm<FormSchemaType>({
//   mode: 'onChange',
//   resolver: clientSideValidation ? zodResolver(FormSchema) : undefined
// });
// const [state, formAction] = useFormState<State, FormData>(getFullName, null);

// useEffect(() => {
//   if (!state) {
//     return;
//   }
//   if (state.status === 'error') {
//     state.errors?.forEach((error) => {
//       setError(error.path as FieldPath<FormSchemaType>, {
//         message: error.message
//       });
//     });
//   }

//   if (state.status === 'success') {
//     alert(state.message);
//     reset();
//   }
// }, [state, setError, reset]);

//   useEffect(() => {
//     console.log(errors);
//   }, [errors]);

//   return (
//     <>
//       <div className="pb-1.5 mb-1.5 border-b flex items-center">
//         <input
//           type="checkbox"
//           checked={clientSideValidation}
//           onChange={() => {
//             reset();
//             setClientSideValidation(!clientSideValidation);
//           }}
//           id="client-side-validation-checkbox"
//           className="mr-3"
//         />
//         <label htmlFor="client-side-validation-checkbox">
//           Enable client-side validation
//         </label>
//       </div>
//       <form action={formAction}>
//         <FormContent register={register} isValid={isValid} errors={errors} />
//       </form>
//     </>
//   );
// }

// function FormContent({
//   register,
//   isValid,
//   errors
// }: {
//   register: UseFormRegister<FormSchemaType>;
//   isValid: boolean;
//   errors: FieldErrors<FormSchemaType>;
// }) {
//   const { pending } = useFormStatus();

//   return (
//     <div className="grid grid-cols-1 gap-3 relative">
//       <div className="w-full">
//         <input
//           {...register('firstName')}
//           placeholder="First name"
//           className={inputClasses}
//           autoFocus={true}
//         />
//         <span className="text-red-500 font-semibold text-sm">
//           <ErrorMessage name="firstName" errors={errors} />
//         </span>
//       </div>
//       <div className="w-full">
//         <input
//           {...register('lastName')}
//           placeholder="Last name"
//           className={inputClasses}
//         />
//         <span className="text-red-500 font-semibold text-sm">
//           <ErrorMessage name="lastName" errors={errors} />
//         </span>
//       </div>
//       <button
//         type="submit"
//         disabled={pending || !isValid}
//         className={buttonClasses}
//       >
//         Send
//       </button>
//       {pending && <span>Loading...</span>}
//     </div>
//   );
// }
