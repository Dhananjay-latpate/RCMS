import action from './action';
import command from './command';
import type { StrapiCloudCommandInfo } from '../types';

export { action, command };

export default {
  name: 'deploy-project',
  description: 'Deploy a Resillix CMS Cloud project',
  action,
  command,
} as StrapiCloudCommandInfo;
