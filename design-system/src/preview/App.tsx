import * as React from 'react';

import {
  Box,
  Flex,
  Grid,
  Typography,
  Button,
  TextInput,
  Textarea,
  Checkbox,
  Toggle,
  Select,
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tooltip,
  TooltipProvider,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  cn,
} from '../lib';
import { AdminShell } from './AdminShell';

/** Live preview / mini style-guide for the Resillix design system. */
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
  { label: 'Semantic', vars: ['--rx-success-500', '--rx-warning-500', '--rx-danger-500'] },
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
  const [view, setView] = React.useState<'guide' | 'shell'>('guide');

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <TooltipProvider delayDuration={150}>
      {/* Control bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur">
        <Flex gap={2} align="center">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            R
          </span>
          <Typography variant="epsilon">Resillix Design System</Typography>
        </Flex>
        <Flex gap={2} align="center">
          <div className="flex rounded-lg border border-border p-0.5">
            {(['guide', 'shell'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                  view === v ? 'bg-primary-100 text-primary-700' : 'text-muted hover:text-ink'
                )}
              >
                {v === 'guide' ? 'Style guide' : 'Admin shell'}
              </button>
            ))}
          </div>
          <Button variant="tertiary" size="S" onClick={() => setDark((d) => !d)}>
            {dark ? '☀ Light' : '☾ Dark'}
          </Button>
        </Flex>
      </div>

      {view === 'shell' ? (
        <div className="px-4 py-3">
          <AdminShell />
        </div>
      ) : (
      <Box className="min-h-full" paddingY={9}>
        <Box className="mx-auto w-full max-w-5xl px-4">

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

          {/* Forms */}
          <Section title="Form controls">
            <Grid cols={2} gap={5}>
              <TextInput label="Project name" placeholder="my-resillix-project" hint="Lowercase, no spaces." />
              <Select
                label="Database"
                placeholder="Choose a database"
                defaultValue="postgres"
                options={[
                  { value: 'postgres', label: 'PostgreSQL' },
                  { value: 'mysql', label: 'MySQL' },
                  { value: 'sqlite', label: 'SQLite' },
                ]}
              />
              <TextInput label="API token" error="This field is required." placeholder="••••••••" />
              <Textarea label="Description" placeholder="What does this content type represent?" />
            </Grid>
            <Flex gap={6} className="mt-5" wrap="wrap">
              <Checkbox label="Enable draft & publish" defaultChecked />
              <Checkbox label="Require review" />
              <Toggle label="Internationalization" defaultChecked />
              <Toggle label="Public access" />
            </Flex>
          </Section>

          {/* Overlays, tabs, tooltip */}
          <Section title="Overlays & navigation">
            <Flex gap={3} align="center" wrap="wrap" className="mb-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open dialog</Button>
                </DialogTrigger>
                <DialogContent
                  title="Delete entry?"
                  description="This action cannot be undone."
                  footer={
                    <>
                      <DialogClose asChild>
                        <Button variant="tertiary">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="danger">Delete</Button>
                      </DialogClose>
                    </>
                  }
                >
                  The selected entry and its relations will be permanently removed.
                </DialogContent>
              </Dialog>

              <Tooltip label="Tokens drive every component">
                <Button variant="tertiary">Hover for tooltip</Button>
              </Tooltip>
            </Flex>

            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <Typography variant="omega" textColor="muted">
                  Manage entries, drafts and published versions.
                </Typography>
              </TabsContent>
              <TabsContent value="settings">
                <Typography variant="omega" textColor="muted">
                  Configure roles, permissions and API tokens.
                </Typography>
              </TabsContent>
              <TabsContent value="webhooks">
                <Typography variant="omega" textColor="muted">
                  Trigger external services on content events.
                </Typography>
              </TabsContent>
            </Tabs>
          </Section>

          {/* Badges */}
          <Section title="Status & badges">
            <Flex gap={3} wrap="wrap">
              <Badge tone="success" dot>
                Published
              </Badge>
              <Badge tone="warning" dot>
                Draft
              </Badge>
              <Badge tone="danger" dot>
                Error
              </Badge>
              <Badge tone="primary">v5.31.0</Badge>
              <Badge tone="neutral">Internal</Badge>
            </Flex>
          </Section>

          {/* Table */}
          <Section title="Table">
            <Table>
              <Thead>
                <Tr>
                  <Th>Entry</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Updated</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[
                  ['Homepage', 'Single type', 'success', 'Published', '2h ago'],
                  ['Blog post #42', 'Collection', 'warning', 'Draft', '5m ago'],
                  ['Author: A. Turing', 'Collection', 'success', 'Published', '1d ago'],
                ].map(([name, type, tone, status, when]) => (
                  <Tr key={name}>
                    <Td className="font-medium">{name}</Td>
                    <Td className="text-muted">{type}</Td>
                    <Td>
                      <Badge tone={tone as 'success' | 'warning'} dot>
                        {status}
                      </Badge>
                    </Td>
                    <Td className="text-muted">{when}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Section>

          {/* Cards / primitives */}
          <Section title="Cards & layout primitives">
            <Grid cols={3} gap={4}>
              {[
                ['Media Library', 'Upload and reuse assets.'],
                ['Content-Type Builder', 'Model your content schema.'],
                ['Roles & Permissions', 'Fine-grained RBAC.'],
              ].map(([title, body]) => (
                <Card key={title} interactive>
                  <CardHeader>
                    <Typography variant="delta">{title}</Typography>
                  </CardHeader>
                  <CardBody>
                    <Typography variant="omega" textColor="muted">
                      {body}
                    </Typography>
                  </CardBody>
                  <CardFooter>
                    <Button variant="ghost" size="S">
                      Open →
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          <Typography variant="pi" textColor="muted" className="block">
            Built on Tailwind + Radix · token-driven · light/dark via the{' '}
            <code className="font-mono">.dark</code> class.
          </Typography>
        </Box>
      </Box>
      )}
    </TooltipProvider>
  );
}
