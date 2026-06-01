import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../utils/cn';

export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

/** Tooltip — Radix-backed. Wrap a trigger; pass the text via `label`. */
export function Tooltip({ label, children, side = 'top' }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            'z-50 rounded-md bg-neutral-800 px-2 py-1 text-xs text-inverted shadow-lg',
            'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in'
          )}
        >
          {label}
          <TooltipPrimitive.Arrow className="fill-neutral-800" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
