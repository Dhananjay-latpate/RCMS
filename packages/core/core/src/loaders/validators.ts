import type { Core } from '@resillix/types';

export default (strapi: Core.Strapi) => {
  strapi.get('validators').set('content-api', { input: [], query: [] });
};
