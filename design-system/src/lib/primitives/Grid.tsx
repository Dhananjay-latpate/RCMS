import * as React from 'react';

import { Box, type BoxProps } from './Box';
import { cn } from '../utils/cn';

/** Grid — Box with a responsive column grid. */
type Cols = 1 | 2 | 3 | 4 | 6 | 12;
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface GridProps extends BoxProps {
  cols?: Cols;
  gap?: Gap;
}

const cols: Record<Cols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};
const gaps: Record<Gap, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 5: 'gap-5', 6: 'gap-6', 7: 'gap-7', 8: 'gap-8',
};

export const Grid = React.forwardRef<HTMLElement, GridProps>(
  ({ cols: c = 2, gap = 4, className, ...props }, ref) => (
    <Box ref={ref} className={cn('grid', cols[c], gaps[gap], className)} {...props} />
  )
);

Grid.displayName = 'Grid';
