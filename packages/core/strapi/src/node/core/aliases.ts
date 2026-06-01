import path from 'node:path';
import { StrapiMonorepo } from './monorepo';

/**
 * The path mappings/aliases used by various tools in the monorepo to map imported modules to
 * source files in order to speed up rebuilding and avoid having a separate watcher process to build
 * from `src` to `lib`.
 *
 * This file is currently read by:
 * - Webpack when running the dev server (only when running in this monorepo)
 */
const devAliases: Record<string, string> = {
  '@resillix/admin/strapi-admin': './packages/core/admin/admin/src',
  '@resillix/content-releases/strapi-admin': './packages/core/content-releases/admin/src',
  '@resillix/content-manager/strapi-admin': './packages/core/content-manager/admin/src',
  '@resillix/content-type-builder/strapi-admin': './packages/core/content-type-builder/admin/src',
  '@resillix/email/strapi-admin': './packages/core/email/admin/src',
  '@resillix/upload/strapi-admin': './packages/core/upload/admin/src',
  '@resillix/plugin-cloud/strapi-admin': './packages/plugins/cloud/admin/src',
  '@resillix/plugin-color-picker/strapi-admin': './packages/plugins/color-picker/admin/src',
  '@resillix/plugin-documentation/strapi-admin': './packages/plugins/documentation/admin/src',
  '@resillix/plugin-graphql/strapi-admin': './packages/plugins/graphql/admin/src',
  '@resillix/i18n/strapi-admin': './packages/plugins/i18n/admin/src',
  '@resillix/plugin-sentry/strapi-admin': './packages/plugins/sentry/admin/src',
  '@resillix/plugin-users-permissions/strapi-admin': './packages/plugins/users-permissions/admin/src',
  '@resillix/review-workflows/strapi-admin': './packages/core/review-workflows/admin/src',
};

const getMonorepoAliases = ({ monorepo }: { monorepo?: StrapiMonorepo }) => {
  if (!monorepo?.path) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(devAliases).map(([key, modulePath]) => {
      return [key, path.join(monorepo.path, modulePath)];
    })
  );
};

export { getMonorepoAliases };
