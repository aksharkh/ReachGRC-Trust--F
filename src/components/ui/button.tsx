import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'default' | 'ghost' | 'outline';
type ButtonSize = 'default' | 'icon' | 'sm';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  default: 'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200',
  ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
  outline: 'border border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900',
};

const sizes: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  icon: 'h-10 w-10',
  sm: 'h-9 px-3',
};

export const Button = ({ className, variant = 'default', size = 'default', ...props }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  />
);
