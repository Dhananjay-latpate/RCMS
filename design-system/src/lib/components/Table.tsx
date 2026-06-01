import * as React from 'react';

import { cn } from '../utils/cn';

/** Table — token-styled table primitives (Table/Thead/Tbody/Tr/Th/Td). */
export const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto rounded-lg border border-border">
    <table className={cn('w-full border-collapse text-sm', className)} {...props} />
  </div>
);

export const Thead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-subtle" {...props} />
);
export const Tbody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;

export const Tr = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('border-b border-border last:border-0 hover:bg-subtle/60', className)} {...props} />
);

export const Th = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted',
      className
    )}
    {...props}
  />
);

export const Td = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-4 py-3 text-ink', className)} {...props} />
);
