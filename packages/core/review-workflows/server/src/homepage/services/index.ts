import type { Plugin } from '@resillix/types';

import { createHomepageService } from './homepage';

export const services = {
  homepage: createHomepageService,
} satisfies Plugin.LoadedPlugin['services'];
