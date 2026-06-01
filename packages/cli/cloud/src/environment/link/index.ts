import action from './action';
import command from './command';
import type { StrapiCloudCommandInfo } from '../../types';

export { action, command };

export default {
  name: 'link-environment',
  description: 'Link Resillix CMS Cloud environment to a local project',
  action,
  command,
} as StrapiCloudCommandInfo;
