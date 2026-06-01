import type { StrapiApp } from '@resillix/strapi/admin';

export default {
  config: {
    locales: ['fr'],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
