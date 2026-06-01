import action from './action';
import command from './command';
import type { StrapiCloudCommandInfo } from '../types';

export { action, command };

export default {
  name: 'login',
  description: 'Resillix CMS Cloud Login',
  action,
  command,
} as StrapiCloudCommandInfo;
