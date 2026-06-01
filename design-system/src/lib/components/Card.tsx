import * as React from 'react';

import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

/** Card — surface container with soft elevation. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ interactive, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-border bg-surface shadow-sm',
        interactive && 'cursor-pointer transition-shadow hover:shadow-lg',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1 border-b border-border p-5', className)} {...props} />
);
export const CardBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5', className)} {...props} />
);
export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center gap-2 border-t border-border p-4', className)} {...props} />
);
