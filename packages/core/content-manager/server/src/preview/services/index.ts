import type { Plugin } from '@resillix/types';

import { createPreviewService } from './preview';
import { createPreviewConfigService } from './preview-config';

export const services = {
  preview: createPreviewService,
  'preview-config': createPreviewConfigService,
} satisfies Plugin.LoadedPlugin['services'];
