import * as React from 'react';

/**
 * AppShell — the admin frame: fixed side nav + sticky top bar + scrolling
 * content region. Composes SideNav and TopBar provided by the caller.
 */
export interface AppShellProps {
  nav: React.ReactNode;
  topBar: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ nav, topBar, children }: AppShellProps) {
  return (
    <div className="flex h-full min-h-0 bg-body">
      {nav}
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
