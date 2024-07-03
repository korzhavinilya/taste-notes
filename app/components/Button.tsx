import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'bg-brown-normal hover:bg-brown-normal-hover text-white py-4 px-5 rounded-2xl font-semibold w-full',
        className
      )}
    >
      {children}
    </button>
  );
}
