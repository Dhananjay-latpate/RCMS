import * as React from 'react';

import { Box, type BoxProps } from './Box';
import { cn } from '../utils/cn';

/** Flex — Box with flexbox controls. API mirrors the legacy DS Flex. */
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: Gap;
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  inline?: boolean;
}

const dir = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
} as const;
const alignment = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;
const justification = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
} as const;
const gaps: Record<Gap, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 5: 'gap-5', 6: 'gap-6', 7: 'gap-7', 8: 'gap-8',
};
const wraps = { wrap: 'flex-wrap', nowrap: 'flex-nowrap', 'wrap-reverse': 'flex-wrap-reverse' } as const;

export const Flex = React.forwardRef<HTMLElement, FlexProps>(
  ({ direction = 'row', align = 'center', justify = 'start', gap, wrap, inline, className, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn(
        inline ? 'inline-flex' : 'flex',
        dir[direction],
        alignment[align],
        justification[justify],
        gap != null && gaps[gap],
        wrap && wraps[wrap],
        className
      )}
      {...props}
    />
  )
);

Flex.displayName = 'Flex';
