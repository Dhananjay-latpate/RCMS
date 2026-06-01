import type { Core } from '@resillix/types';

import executeCERegister from '../../../server/src/register';

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  await executeCERegister({ strapi });
};
