import * as React from 'react';

import { cn } from '../utils/cn';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Render a leading status dot (e.g. draft/published indicators). */
  dot?: boolean;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-subtle text-muted',
  primary: 'bg-primary-100 text-primary-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  danger: 'bg-danger-100 text-danger-700',
};
const dots: Record<BadgeTone, string> = {
  neutral: 'bg-neutral-400',
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
};

/** Badge / Status / Tag — compact status label. */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', dot, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dots[tone])} />}
      {children}
    </span>
  )
);
Badge.displayName = 'Badge';
