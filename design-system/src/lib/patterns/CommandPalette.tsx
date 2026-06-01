import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { SearchIcon } from './icons';
import { cn } from '../utils/cn';

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  icon?: React.ReactNode;
  hint?: string;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  onSelect?: (item: CommandItem) => void;
  placeholder?: string;
}

/**
 * CommandPalette — ⌘K quick switcher. Built on Radix Dialog with a filtered,
 * keyboard-navigable list. Open state is controlled by the caller (see
 * `useCommandPalette` for the ⌘K/Ctrl+K binding).
 */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  onSelect,
  placeholder = 'Type a command or search…',
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.group?.toLowerCase().includes(q));
  }, [items, query]);

  React.useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);
  React.useEffect(() => setActive(0), [query]);

  const choose = (item?: CommandItem) => {
    if (!item) return;
    onSelect?.(item);
    onOpenChange(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(filtered[active]);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm" />
        <DialogPrimitive.Content
          aria-label="Command palette"
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-[15%] z-50 w-[min(92vw,40rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-lg focus:outline-none"
        >
          <DialogPrimitive.Title className="sr-only">Command palette</DialogPrimitive.Title>
          <div className="flex items-center gap-2 border-b border-border px-4">
            <SearchIcon width={18} height={18} className="text-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            />
          </div>
          <ul className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted">No results.</li>
            )}
            {filtered.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm',
                    i === active ? 'bg-primary-100 text-primary-700' : 'text-ink'
                  )}
                >
                  {item.icon && <span className="text-muted">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.group && <span className="text-xs text-muted">{item.group}</span>}
                  {item.hint && <kbd className="text-xs text-muted">{item.hint}</kbd>}
                </button>
              </li>
            ))}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Binds ⌘K / Ctrl+K to toggle the palette. Returns [open, setOpen]. */
export function useCommandPalette(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return [open, setOpen];
}
