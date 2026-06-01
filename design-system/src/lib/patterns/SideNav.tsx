import * as React from 'react';

import { cn } from '../utils/cn';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface SideNavProps {
  brand?: React.ReactNode;
  sections: NavSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  footer?: React.ReactNode;
}

/**
 * SideNav — the admin left navigation rail.
 *
 * Width matches the legacy admin token (WIDTH_SIDE_NAVIGATION, 23.2rem).
 */
export function SideNav({ brand, sections, activeId, onSelect, footer }: SideNavProps) {
  return (
    <nav className="flex h-full w-[232px] shrink-0 flex-col border-r border-border bg-surface">
      {brand != null && (
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">{brand}</div>
      )}
      <div className="flex-1 overflow-y-auto p-3">
        {sections.map((section, i) => (
          <div key={section.title ?? i} className="mb-4">
            {section.title && (
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                {section.title}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect?.(item.id)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex w-full items-center gap-3 rounded px-3 py-2 text-sm transition-colors',
                        active
                          ? 'bg-primary-100 font-medium text-primary-700'
                          : 'text-ink hover:bg-subtle'
                      )}
                    >
                      {item.icon && (
                        <span className={cn(active ? 'text-primary-600' : 'text-muted')}>
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {footer != null && <div className="border-t border-border p-3">{footer}</div>}
    </nav>
  );
}
