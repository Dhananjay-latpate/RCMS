import { RenderAdminArgs, renderAdmin } from '@resillix/admin/strapi-admin';
import contentTypeBuilder from '@resillix/content-type-builder/strapi-admin';
import contentManager from '@resillix/content-manager/strapi-admin';
import email from '@resillix/email/strapi-admin';
import upload from '@resillix/upload/strapi-admin';
import i18n from '@resillix/i18n/strapi-admin';
import contentReleases from '@resillix/content-releases/strapi-admin';
import reviewWorkflows from '@resillix/review-workflows/strapi-admin';

const render = (mountNode: HTMLElement | null, { plugins, ...restArgs }: RenderAdminArgs) => {
  return renderAdmin(mountNode, {
    ...restArgs,
    plugins: {
      'content-manager': contentManager,
      'content-type-builder': contentTypeBuilder,
      email,
      upload,
      contentReleases,
      i18n,
      reviewWorkflows,
      ...plugins,
    },
  });
};

export { render as renderAdmin };
export type { RenderAdminArgs };

export * from '@resillix/admin/strapi-admin';

export {
  unstable_useDocumentLayout,
  unstable_useDocumentActions,
  unstable_useDocument,
  unstable_useContentManagerContext,
  useDocumentRBAC,
} from '@resillix/content-manager/strapi-admin';

export {
  private_useAutoReloadOverlayBlocker,
  private_AutoReloadOverlayBlockerProvider,
} from '@resillix/content-type-builder/strapi-admin';
