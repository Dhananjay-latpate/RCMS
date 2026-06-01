import * as React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '../utils/cn';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
}

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ label, className, id, ...props }, ref) => {
  const reactId = React.useId();
  const checkboxId = id ?? reactId;
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-surface',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          'data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600 data-[state=checked]:text-white',
          'disabled:opacity-50',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label != null && (
        <label htmlFor={checkboxId} className="text-sm text-ink select-none">
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = 'Checkbox';
