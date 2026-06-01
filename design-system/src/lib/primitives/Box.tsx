import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '../utils/cn';

/**
 * Box — the base layout primitive.
 *
 * Keeps an API close to the legacy `@strapi/design-system` Box (spacing as
 * 1–10 scale tokens, `background`, `hasRadius`, `shadow`, `asChild`) so admin
 * and plugin code migrates without churn, while rendering Tailwind token
 * classes under the hood.
 */
type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Surface = 'surface' | 'subtle' | 'body' | 'primary100' | 'neutral0' | 'neutral100';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  padding?: Space;
  paddingX?: Space;
  paddingY?: Space;
  background?: Surface;
  hasRadius?: boolean;
  borderColor?: 'border' | 'border-strong';
  shadow?: 'sm' | 'md' | 'lg';
}

const pad: Record<Space, string> = {
  0: 'p-0', 1: 'p-1', 2: 'p-2', 3: 'p-3', 4: 'p-4', 5: 'p-5',
  6: 'p-6', 7: 'p-7', 8: 'p-8', 9: 'p-9', 10: 'p-10',
};
const padX: Record<Space, string> = {
  0: 'px-0', 1: 'px-1', 2: 'px-2', 3: 'px-3', 4: 'px-4', 5: 'px-5',
  6: 'px-6', 7: 'px-7', 8: 'px-8', 9: 'px-9', 10: 'px-10',
};
const padY: Record<Space, string> = {
  0: 'py-0', 1: 'py-1', 2: 'py-2', 3: 'py-3', 4: 'py-4', 5: 'py-5',
  6: 'py-6', 7: 'py-7', 8: 'py-8', 9: 'py-9', 10: 'py-10',
};
const bg: Record<Surface, string> = {
  surface: 'bg-surface',
  subtle: 'bg-subtle',
  body: 'bg-body',
  neutral0: 'bg-surface',
  neutral100: 'bg-body',
  primary100: 'bg-primary-100',
};
const shadow = { sm: 'shadow-sm', md: 'shadow', lg: 'shadow-lg' } as const;

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    { asChild, padding, paddingX, paddingY, background, hasRadius, borderColor, shadow: sh, className, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref as never}
        className={cn(
          padding != null && pad[padding],
          paddingX != null && padX[paddingX],
          paddingY != null && padY[paddingY],
          background && bg[background],
          hasRadius && 'rounded',
          borderColor === 'border' && 'border border-border',
          borderColor === 'border-strong' && 'border border-border-strong',
          sh && shadow[sh],
          className
        )}
        {...props}
      />
    );
  }
);

Box.displayName = 'Box';
