/**
 * @resillix/design-system — public surface (Phase 1).
 *
 * Token CSS is shipped separately at `./tokens/tokens.css`; the Tailwind preset
 * at `../../tailwind-preset.cjs`. This barrel exports the runtime components.
 */
export { Box, type BoxProps } from './primitives/Box';
export { Flex, type FlexProps } from './primitives/Flex';
export { Grid, type GridProps } from './primitives/Grid';
export {
  Typography,
  type TypographyProps,
  type TypographyVariant,
} from './primitives/Typography';
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './components/Button';
export { cn } from './utils/cn';
