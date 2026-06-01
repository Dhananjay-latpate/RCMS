import * as React from 'react';

import { SearchIcon } from './icons';
import { cn } from '../utils/cn';

export interface TopBarProps {
  onSearchClick?: () => void;
  searchHint?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * TopBar — admin header. Height matches the legacy token (HEIGHT_TOP_NAVIGATION,
 * 6.4rem ≈ 64px). Hosts the command-palette trigger and quick actions.
 */
export function TopBar({ onSearchClick, searchHint = 'Search… ⌘K', actions, className }: TopBarProps) {
  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between gap-4 border-b border-border bg-surface px-6',
        className
      )}
    >
      <button
        type="button"
        onClick={onSearchClick}
        className="flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-border bg-subtle px-3 text-sm text-muted transition-colors hover:border-border-strong"
      >
        <SearchIcon width={16} height={16} />
        <span className="flex-1 text-left">{searchHint}</span>
      </button>
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
}
