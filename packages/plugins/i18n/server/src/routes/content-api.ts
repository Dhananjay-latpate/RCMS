import type { Core } from '@resillix/types';
import { createContentApiRoutesFactory } from '@resillix/utils';
import { I18nLocaleRouteValidator } from './validation';

const createContentApiRoutes = createContentApiRoutesFactory((): Core.RouterInput['routes'] => {
  const validator = new I18nLocaleRouteValidator(strapi);
  return [
    {
      method: 'GET',
      path: '/locales',
      handler: 'locales.listLocales',
      response: validator.locales,
    },
  ];
});

export default createContentApiRoutes;
