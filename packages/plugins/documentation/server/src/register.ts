import type { Core } from '@resillix/types';

import { addDocumentMiddlewares } from './middlewares/documentation';

export async function register({ strapi }: { strapi: Core.Strapi }) {
  await addDocumentMiddlewares({ strapi });
}
