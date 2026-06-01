import type { Core } from '@resillix/types';
import executeCEDestroy from '../../../server/src/destroy';

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  await executeCEDestroy();
};
