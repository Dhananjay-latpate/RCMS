import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '../utils/cn';

/**
 * Button — modern-minimal action.
 *
 * Variant/size names mirror the legacy DS (default/secondary/tertiary/
 * danger-light/success-light/ghost; S/M/L) for drop-in compatibility.
 */
export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger'
  | 'success';
export type ButtonSize = 'S' | 'M' | 'L';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none select-none';

const variants: Record<ButtonVariant, string> = {
  default: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
  secondary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
  tertiary: 'bg-surface text-ink border border-border hover:bg-subtle',
  ghost: 'bg-transparent text-ink hover:bg-subtle',
  danger: 'bg-danger-500 text-white hover:bg-danger-700 shadow-sm',
  success: 'bg-success-500 text-white hover:bg-success-700 shadow-sm',
};
const sizes: Record<ButtonSize, string> = {
  S: 'h-8 px-3 text-xs',
  M: 'h-10 px-4 text-sm',
  L: 'h-12 px-5 text-base',
};

const Spinner = () => (
  <span
    aria-hidden
    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
  />
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      variant = 'default',
      size = 'M',
      fullWidth,
      loading,
      startIcon,
      endIcon,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Spinner /> : startIcon}
        {children}
        {!loading && endIcon}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
