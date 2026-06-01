import type { Plugin } from '@resillix/types';
import history from './history';

const destroy: Plugin.LoadedPlugin['destroy'] = async ({ strapi }) => {
  await history.destroy?.({ strapi });
};

export default destroy;
