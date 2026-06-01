/**
 * Resillix Tailwind preset.
 *
 * Maps the CSS-variable token layer (tokens.css) onto Tailwind's theme so the
 * whole monorepo can share one source of truth. Consumers add:
 *   presets: [require('@resillix/design-system/tailwind-preset.cjs')]
 */
const neutral = (s) => `var(--rx-neutral-${s})`;
const primary = (s) => `var(--rx-primary-${s})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          0: neutral(0),
          50: neutral(50),
          100: neutral(100),
          150: neutral(150),
          200: neutral(200),
          300: neutral(300),
          400: neutral(400),
          500: neutral(500),
          600: neutral(600),
          700: neutral(700),
          800: neutral(800),
          900: neutral(900),
        },
        primary: {
          50: primary(50),
          100: primary(100),
          200: primary(200),
          300: primary(300),
          400: primary(400),
          500: primary(500),
          600: primary(600),
          700: primary(700),
        },
        success: {
          100: 'var(--rx-success-100)',
          500: 'var(--rx-success-500)',
          700: 'var(--rx-success-700)',
        },
        warning: {
          100: 'var(--rx-warning-100)',
          500: 'var(--rx-warning-500)',
          700: 'var(--rx-warning-700)',
        },
        danger: {
          100: 'var(--rx-danger-100)',
          500: 'var(--rx-danger-500)',
          700: 'var(--rx-danger-700)',
        },
        // Semantic aliases
        body: 'var(--rx-bg-body)',
        surface: 'var(--rx-bg-surface)',
        subtle: 'var(--rx-bg-subtle)',
        border: 'var(--rx-border)',
        'border-strong': 'var(--rx-border-strong)',
        ink: 'var(--rx-text)',
        muted: 'var(--rx-text-muted)',
        inverted: 'var(--rx-text-inverted)',
      },
      spacing: {
        1: 'var(--rx-space-1)',
        2: 'var(--rx-space-2)',
        3: 'var(--rx-space-3)',
        4: 'var(--rx-space-4)',
        5: 'var(--rx-space-5)',
        6: 'var(--rx-space-6)',
        7: 'var(--rx-space-7)',
        8: 'var(--rx-space-8)',
        9: 'var(--rx-space-9)',
        10: 'var(--rx-space-10)',
      },
      borderRadius: {
        sm: 'var(--rx-radius-sm)',
        DEFAULT: 'var(--rx-radius)',
        lg: 'var(--rx-radius-lg)',
        xl: 'var(--rx-radius-xl)',
        full: 'var(--rx-radius-full)',
      },
      boxShadow: {
        sm: 'var(--rx-shadow-sm)',
        DEFAULT: 'var(--rx-shadow)',
        lg: 'var(--rx-shadow-lg)',
      },
      fontFamily: {
        sans: 'var(--rx-font-sans)',
        mono: 'var(--rx-font-mono)',
      },
    },
  },
  plugins: [],
};
