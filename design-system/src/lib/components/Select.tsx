import * as React from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { Field } from './Field';
import { cn } from '../utils/cn';

const ChevronIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface SelectOption {
  value: string;
  label: React.ReactNode;
}

export interface SelectProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
}

/** Select — single-select dropdown on Radix Select. Mirrors the legacy SingleSelect. */
export function Select({
  label,
  hint,
  error,
  placeholder = 'Select…',
  value,
  defaultValue,
  onValueChange,
  options,
  disabled,
  required,
}: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            'inline-flex h-10 w-full items-center justify-between gap-2 rounded border bg-surface px-3 text-sm text-ink',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-500',
            'disabled:opacity-50 data-[placeholder]:text-muted',
            error ? 'border-danger-500' : 'border-border'
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="text-muted">
            <ChevronIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-50 max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center justify-between rounded px-2 py-1.5 text-sm text-ink outline-none',
                    'data-[highlighted]:bg-subtle data-[state=checked]:text-primary-600 data-[disabled]:opacity-50'
                  )}
                >
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="text-primary-600">
                    <CheckIcon />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </Field>
  );
}
