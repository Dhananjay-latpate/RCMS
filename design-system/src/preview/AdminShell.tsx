import * as React from 'react';

import {
  AppShell,
  SideNav,
  TopBar,
  PageHeader,
  CommandPalette,
  useCommandPalette,
  Button,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TextInput,
  Select,
  Flex,
  Icons,
} from '../lib';

/** A realistic admin screen (Content Manager) assembled from shell patterns. */
const NAV = [
  {
    items: [
      { id: 'home', label: 'Home', icon: <Icons.HomeIcon /> },
      {
        id: 'content',
        label: 'Content Manager',
        icon: <Icons.ContentIcon />,
        badge: <Badge tone="primary">128</Badge>,
      },
      { id: 'builder', label: 'Content-Type Builder', icon: <Icons.BuilderIcon /> },
      { id: 'media', label: 'Media Library', icon: <Icons.MediaIcon /> },
    ],
  },
  {
    title: 'General',
    items: [{ id: 'settings', label: 'Settings', icon: <Icons.SettingsIcon /> }],
  },
];

const COMMANDS = [
  { id: 'new', label: 'Create new entry', group: 'Content', icon: <Icons.PlusIcon width={16} height={16} /> },
  { id: 'media', label: 'Upload media', group: 'Media', icon: <Icons.MediaIcon width={16} height={16} /> },
  { id: 'builder', label: 'Open Content-Type Builder', group: 'Build', icon: <Icons.BuilderIcon width={16} height={16} /> },
  { id: 'settings', label: 'Go to Settings', group: 'Navigate', icon: <Icons.SettingsIcon width={16} height={16} /> },
  { id: 'tokens', label: 'Manage API tokens', group: 'Settings' },
];

const ROWS = [
  ['Welcome to Resillix', 'Article', 'success', 'Published', 'A. Turing', '2h ago'],
  ['Headless 101', 'Article', 'warning', 'Draft', 'G. Hopper', '5m ago'],
  ['Roadmap 2026', 'Page', 'success', 'Published', 'K. Johnson', '1d ago'],
  ['Changelog', 'Page', 'neutral', 'Modified', 'A. Lovelace', '3d ago'],
] as const;

export function AdminShell() {
  const [active, setActive] = React.useState('content');
  const [paletteOpen, setPaletteOpen] = useCommandPalette();

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden rounded-xl border border-border shadow-sm">
      <AppShell
        nav={
          <SideNav
            brand={
              <Flex gap={2} align="center">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
                  R
                </span>
                <span className="text-sm font-semibold text-ink">Resillix</span>
              </Flex>
            }
            sections={NAV}
            activeId={active}
            onSelect={setActive}
            footer={
              <Flex gap={2} align="center" className="px-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-subtle text-xs font-medium text-ink">
                  DL
                </span>
                <span className="text-xs text-muted">dlatpate3@gmail.com</span>
              </Flex>
            }
          />
        }
        topBar={
          <TopBar
            onSearchClick={() => setPaletteOpen(true)}
            actions={
              <>
                <Button variant="ghost" size="S" aria-label="Notifications">
                  <Icons.BellIcon width={18} height={18} />
                </Button>
                <Button size="S" startIcon={<Icons.PlusIcon width={16} height={16} />}>
                  Create new entry
                </Button>
              </>
            }
          />
        }
      >
        <PageHeader
          breadcrumbs={[{ label: 'Content Manager' }, { label: 'Collection Types' }, { label: 'Article' }]}
          title="Article"
          subtitle="128 entries found"
          actions={
            <>
              <Button variant="tertiary" size="S">
                Configure the view
              </Button>
              <Button size="S" startIcon={<Icons.PlusIcon width={16} height={16} />}>
                Create new entry
              </Button>
            </>
          }
        />

        <Flex gap={3} className="mb-4" wrap="wrap" align="end">
          <div className="w-64">
            <TextInput placeholder="Search entries…" startIcon={<Icons.SearchIcon width={16} height={16} />} />
          </div>
          <div className="w-44">
            <Select
              placeholder="Status"
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' },
              ]}
            />
          </div>
        </Flex>

        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Author</Th>
              <Th>Updated</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ROWS.map(([title, type, tone, status, author, when]) => (
              <Tr key={title}>
                <Td className="font-medium">{title}</Td>
                <Td className="text-muted">{type}</Td>
                <Td>
                  <Badge tone={tone} dot>
                    {status}
                  </Badge>
                </Td>
                <Td className="text-muted">{author}</Td>
                <Td className="text-muted">{when}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </AppShell>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={COMMANDS}
        onSelect={(c) => c.id !== 'new' && setActive(c.id)}
      />
    </div>
  );
}
