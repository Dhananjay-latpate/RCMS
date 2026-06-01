import type { Core } from '@resillix/types';

/**
 * A function type that defines a rule for matching a route.
 */
export type MatcherRule = (route: Core.Route) => boolean;
