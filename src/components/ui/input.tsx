import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      'h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500 dark:focus:border-neutral-600',
      className,
    )}
    {...props}
  />
);
