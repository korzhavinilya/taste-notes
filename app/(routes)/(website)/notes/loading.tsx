// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Loading() {
  return (
    <>
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex flex-col p-4">
          <div className="h-6 w-full rounded-md bg-gray-200 text-sm font-medium" />
          <div className="mt-2 h-6 w-full rounded-md bg-gray-200 text-sm font-medium" />
        </div>
      </div>

      <div
        className={`${shimmer} mt-4 relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex flex-col p-4">
          <div className="h-6 w-full rounded-md bg-gray-200 text-sm font-medium" />
          <div className="mt-2 h-6 w-full rounded-md bg-gray-200 text-sm font-medium" />
        </div>
      </div>
    </>
  );
}
