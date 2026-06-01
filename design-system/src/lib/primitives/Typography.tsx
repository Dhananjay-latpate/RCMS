import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '../utils/cn';

/**
 * Typography — text primitive with a named scale.
 *
 * Variant names mirror the legacy DS (alpha/beta/delta/epsilon/omega/pi/sigma)
 * so existing usages keep working, mapped to a modern-minimal type scale.
 */
export type TypographyVariant =
  | 'alpha'
  | 'beta'
  | 'delta'
  | 'epsilon'
  | 'omega'
  | 'pi'
  | 'sigma';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  variant?: TypographyVariant;
  textColor?: 'ink' | 'muted' | 'primary' | 'inverted' | 'danger' | 'success';
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
}

const variants: Record<TypographyVariant, string> = {
  alpha: 'text-3xl leading-tight font-semibold tracking-tight',
  beta: 'text-2xl leading-tight font-semibold tracking-tight',
  delta: 'text-xl leading-snug font-semibold',
  epsilon: 'text-base leading-normal font-medium',
  omega: 'text-sm leading-normal',
  pi: 'text-xs leading-normal',
  sigma: 'text-xs leading-normal font-semibold uppercase tracking-wide',
};
const color = {
  ink: 'text-ink',
  muted: 'text-muted',
  primary: 'text-primary-600',
  inverted: 'text-inverted',
  danger: 'text-danger-500',
  success: 'text-success-500',
} as const;
const weight = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;
const align = { left: 'text-left', center: 'text-center', right: 'text-right' } as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { asChild, variant = 'omega', textColor = 'ink', fontWeight, textAlign, ellipsis, className, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        ref={ref as never}
        className={cn(
          'font-sans',
          variants[variant],
          color[textColor],
          fontWeight && weight[fontWeight],
          textAlign && align[textAlign],
          ellipsis && 'truncate',
          className
        )}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';
