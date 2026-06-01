import * as React from 'react';

/** Minimal 1.5px-stroke icon set for the shell (no external icon dep yet). */
type IconProps = React.SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  width: 20,
  height: 20,
  'aria-hidden': true,
  ...props,
});

export const HomeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
);
export const ContentIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);
export const BuilderIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
export const MediaIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9" r="1.5" />
    <path d="M21 16l-5-5L5 20" />
  </svg>
);
export const SettingsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19 12a7 7 0 00-.1-1l2-1.5-2-3.5-2.3 1A7 7 0 0014 4.6L13.5 2h-3L10 4.6a7 7 0 00-2.6 1.4l-2.3-1-2 3.5L5.1 11a7 7 0 000 2l-2 1.5 2 3.5 2.3-1A7 7 0 0010 19.4L10.5 22h3l.5-2.6a7 7 0 002.6-1.4l2.3 1 2-3.5-2-1.5c.07-.33.1-.66.1-1z" />
  </svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4-4" />
  </svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const BellIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 01-3.4 0" />
  </svg>
);
export const ChevronIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
