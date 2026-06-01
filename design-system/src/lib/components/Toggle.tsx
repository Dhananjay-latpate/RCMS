import * as React from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '../utils/cn';

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: React.ReactNode;
}

/** Toggle / Switch — Radix-backed on-off control. */
export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ label, className, id, ...props }, ref) => {
  const reactId = React.useId();
  const switchId = id ?? reactId;
  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full border border-transparent bg-neutral-300 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          'data-[state=checked]:bg-primary-600 disabled:opacity-50',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-[22px]" />
      </SwitchPrimitive.Root>
      {label != null && (
        <label htmlFor={switchId} className="text-sm text-ink select-none">
          {label}
        </label>
      )}
    </div>
  );
});
Toggle.displayName = 'Toggle';
