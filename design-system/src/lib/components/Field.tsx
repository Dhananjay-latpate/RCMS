import * as React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '../utils/cn';

/**
 * Field — the labelled form-control wrapper shared by inputs.
 *
 * Mirrors the legacy DS `Field` composition (label + hint + error) so form
 * code migrates with minimal churn. Inputs (TextInput, Textarea, …) opt in by
 * accepting the same `label`/`hint`/`error`/`required` props and rendering
 * through this wrapper.
 */
const FieldContext = React.createContext<{ id?: string; hasError?: boolean }>({});

export interface FieldProps {
  id?: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({ id, label, hint, error, required, children, className }: FieldProps) {
  const reactId = React.useId();
  const fieldId = id ?? reactId;
  const hasError = Boolean(error);

  return (
    <FieldContext.Provider value={{ id: fieldId, hasError }}>
      <div className={cn('flex flex-col gap-1', className)}>
        {label != null && (
          <LabelPrimitive.Root
            htmlFor={fieldId}
            className="text-sm font-medium text-ink"
          >
            {label}
            {required && <span className="ml-0.5 text-danger-500">*</span>}
          </LabelPrimitive.Root>
        )}
        {children}
        {error ? (
          <p className="text-xs text-danger-500">{error}</p>
        ) : hint ? (
          <p className="text-xs text-muted">{hint}</p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}

export function useField() {
  return React.useContext(FieldContext);
}

/** Shared input chrome — token-driven, error-aware, focus ring. */
export const inputClassName = (hasError?: boolean) =>
  cn(
    'w-full rounded border bg-surface px-3 text-sm text-ink placeholder:text-muted',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500',
    'disabled:opacity-50 disabled:bg-subtle',
    hasError ? 'border-danger-500 focus:ring-danger-500/40' : 'border-border'
  );
