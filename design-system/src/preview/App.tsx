import * as React from 'react';

import { Box, Flex, Grid, Typography, Button } from '../lib';

/** Live preview / mini style-guide for Resillix design system Phase 1. */
const swatches: Array<{ label: string; vars: string[] }> = [
  {
    label: 'Neutral',
    vars: ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map(
      (s) => `--rx-neutral-${s}`
    ),
  },
  {
    label: 'Primary',
    vars: ['50', '100', '200', '300', '400', '500', '600', '700'].map((s) => `--rx-primary-${s}`),
  },
  {
    label: 'Semantic',
    vars: ['--rx-success-500', '--rx-warning-500', '--rx-danger-500'],
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box background="surface" hasRadius borderColor="border" padding={6} shadow="sm" className="mb-6">
      <Typography variant="sigma" textColor="muted" className="mb-4 block">
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function App() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <Box className="min-h-full" paddingY={9}>
      <Box className="mx-auto w-full max-w-5xl px-4">
        {/* Header */}
        <Flex justify="between" align="center" className="mb-8">
          <Box>
            <Typography asChild variant="alpha">
              <h1>Resillix Design System</h1>
            </Typography>
            <Typography variant="omega" textColor="muted" className="mt-1 block">
              Phase 1 — tokens, themes &amp; primitives. Live preview.
            </Typography>
          </Box>
          <Button variant="tertiary" size="S" onClick={() => setDark((d) => !d)}>
            {dark ? '☀ Light' : '☾ Dark'}
          </Button>
        </Flex>

        {/* Colors */}
        <Section title="Color tokens">
          <Flex direction="column" gap={5} align="stretch">
            {swatches.map((row) => (
              <Box key={row.label}>
                <Typography variant="omega" fontWeight="medium" className="mb-2 block">
                  {row.label}
                </Typography>
                <Flex gap={2} wrap="wrap">
                  {row.vars.map((v) => (
                    <Flex key={v} direction="column" gap={1} align="start">
                      <span
                        className="h-12 w-12 rounded border border-border"
                        style={{ background: `var(${v})` }}
                      />
                      <Typography variant="pi" textColor="muted">
                        {v.replace('--rx-', '')}
                      </Typography>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>
        </Section>

        {/* Typography */}
        <Section title="Type scale">
          <Flex direction="column" gap={3} align="start">
            <Typography variant="alpha">Alpha — page title</Typography>
            <Typography variant="beta">Beta — section title</Typography>
            <Typography variant="delta">Delta — subsection</Typography>
            <Typography variant="epsilon">Epsilon — emphasized body</Typography>
            <Typography variant="omega">Omega — body text</Typography>
            <Typography variant="pi" textColor="muted">
              Pi — captions &amp; helper text
            </Typography>
            <Typography variant="sigma" textColor="muted">
              Sigma — overline label
            </Typography>
          </Flex>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <Flex direction="column" gap={4} align="start">
            <Flex gap={3} wrap="wrap">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </Flex>
            <Flex gap={3} align="center" wrap="wrap">
              <Button size="S">Small</Button>
              <Button size="M">Medium</Button>
              <Button size="L">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </Flex>
          </Flex>
        </Section>

        {/* Layout primitives */}
        <Section title="Primitives — Grid / Box / Flex">
          <Grid cols={3} gap={4}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Box
                key={n}
                background="subtle"
                hasRadius
                borderColor="border"
                padding={5}
              >
                <Typography variant="epsilon">Card {n}</Typography>
                <Typography variant="omega" textColor="muted" className="mt-1 block">
                  Composed from Box + Typography on shared tokens.
                </Typography>
              </Box>
            ))}
          </Grid>
        </Section>

        <Typography variant="pi" textColor="muted" className="block">
          Built on Tailwind + Radix · token-driven · light/dark via the{' '}
          <code className="font-mono">.dark</code> class.
        </Typography>
      </Box>
    </Box>
  );
}
