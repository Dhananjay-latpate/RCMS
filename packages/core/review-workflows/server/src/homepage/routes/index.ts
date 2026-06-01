import type { Plugin } from '@resillix/types';
import { homepageRouter } from './homepage';

export const routes = {
  homepage: homepageRouter,
} satisfies Plugin.LoadedPlugin['routes'];
