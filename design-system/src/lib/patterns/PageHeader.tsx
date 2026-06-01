import * as React from 'react';

import { cn } from '../utils/cn';

export interface Breadcrumb {
  label: string;
  id?: string;
}

export interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  className?: string;
}

/** PageHeader — content-area header: breadcrumbs, title, subtitle, actions. */
export function PageHeader({ title, subtitle, breadcrumbs, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-3 pb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-muted">
          {breadcrumbs.map((c, i) => (
            <React.Fragment key={c.label}>
              {i > 0 && <span className="text-border-strong">/</span>}
              <span className={cn(i === breadcrumbs.length - 1 && 'text-ink')}>{c.label}</span>
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
          {subtitle != null && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {actions != null && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
