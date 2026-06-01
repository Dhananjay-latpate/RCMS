import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '../utils/cn';

/**
 * Dialog / Modal — Radix-backed accessible overlay.
 *
 * Exposes Root/Trigger/Close passthroughs plus a styled `Content` with optional
 * title/description, matching the legacy DS Modal composition.
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export interface DialogContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    'title'
  > {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ title, description, footer, children, className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2',
        'rounded-xl border border-border bg-surface shadow-lg focus:outline-none',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div className="flex flex-col gap-1">
          {title != null && (
            <DialogPrimitive.Title className="text-lg font-semibold text-ink">
              {title}
            </DialogPrimitive.Title>
          )}
          {description != null && (
            <DialogPrimitive.Description className="text-sm text-muted">
              {description}
            </DialogPrimitive.Description>
          )}
        </div>
        <DialogPrimitive.Close
          aria-label="Close"
          className="rounded p-1 text-muted transition-colors hover:bg-subtle hover:text-ink"
        >
          <CloseIcon />
        </DialogPrimitive.Close>
      </div>
      <div className="p-5 text-sm text-ink">{children}</div>
      {footer != null && (
        <div className="flex justify-end gap-2 border-t border-border p-4">{footer}</div>
      )}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';
