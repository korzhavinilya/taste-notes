import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

interface ButtonLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink({ children, className, ...rest }: ButtonLinkProps) {
  return (
    <Link
      {...rest}
      className={clsx(
        className,
        'block text-center bg-brown-normal hover:bg-brown-normal-hover text-white py-4 px-5 rounded-2xl font-semibold w-full'
      )}
    >
      {children}
    </Link>
  );
}
