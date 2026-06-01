/**
 * @resillix/design-system — public surface.
 *
 * Token CSS is shipped separately at `./tokens/tokens.css`; the Tailwind preset
 * at `../../tailwind-preset.cjs`. This barrel exports the runtime components.
 */

// Primitives
export { Box, type BoxProps } from './primitives/Box';
export { Flex, type FlexProps } from './primitives/Flex';
export { Grid, type GridProps } from './primitives/Grid';
export {
  Typography,
  type TypographyProps,
  type TypographyVariant,
} from './primitives/Typography';

// Components
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './components/Button';
export { Field, useField, inputClassName, type FieldProps } from './components/Field';
export {
  TextInput,
  Textarea,
  type TextInputProps,
  type TextareaProps,
} from './components/TextInput';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Toggle, type ToggleProps } from './components/Toggle';
export { Select, type SelectProps, type SelectOption } from './components/Select';
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  type DialogContentProps,
} from './components/Dialog';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
export { Tooltip, TooltipProvider, type TooltipProps } from './components/Tooltip';
export { Badge, type BadgeProps, type BadgeTone } from './components/Badge';
export { Card, CardHeader, CardBody, CardFooter, type CardProps } from './components/Card';
export { Table, Thead, Tbody, Tr, Th, Td } from './components/Table';

// Patterns (app shell)
export { AppShell, type AppShellProps } from './patterns/AppShell';
export {
  SideNav,
  type SideNavProps,
  type NavItem,
  type NavSection,
} from './patterns/SideNav';
export { TopBar, type TopBarProps } from './patterns/TopBar';
export {
  PageHeader,
  type PageHeaderProps,
  type Breadcrumb,
} from './patterns/PageHeader';
export {
  CommandPalette,
  useCommandPalette,
  type CommandPaletteProps,
  type CommandItem,
} from './patterns/CommandPalette';
export * as Icons from './patterns/icons';

// Utils
export { cn } from './utils/cn';
