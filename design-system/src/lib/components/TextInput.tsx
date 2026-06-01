import * as React from 'react';

import { Field, inputClassName, useField } from './Field';
import { cn } from '../utils/cn';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, Omit<TextInputProps, 'label' | 'hint' | 'error'>>(
  ({ startIcon, endIcon, className, id, ...props }, ref) => {
    const field = useField();
    const inputId = id ?? field.id;
    return (
      <div className="relative flex items-center">
        {startIcon && (
          <span className="pointer-events-none absolute left-3 text-muted">{startIcon}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={field.hasError || undefined}
          className={cn(
            inputClassName(field.hasError),
            'h-10',
            startIcon && 'pl-9',
            endIcon && 'pr-9',
            className
          )}
          {...props}
        />
        {endIcon && <span className="absolute right-3 text-muted">{endIcon}</span>}
      </div>
    );
  }
);
Input.displayName = 'TextInputControl';

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, hint, error, required, id, ...props }, ref) => (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      <Input ref={ref} required={required} {...props} />
    </Field>
  )
);
TextInput.displayName = 'TextInput';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, required, id, className, ...props }, ref) => {
    const reactId = React.useId();
    const fieldId = id ?? reactId;
    return (
      <Field id={fieldId} label={label} hint={hint} error={error} required={required}>
        <textarea
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          className={cn(inputClassName(Boolean(error)), 'min-h-24 py-2 leading-relaxed', className)}
          {...props}
        />
      </Field>
    );
  }
);
Textarea.displayName = 'Textarea';
