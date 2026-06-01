import action from './action';
import command from './command';
import type { StrapiCloudCommandInfo } from '../types';

export { action, command };

export default {
  name: 'list-projects',
  description: 'List Resillix CMS Cloud projects',
  action,
  command,
} as StrapiCloudCommandInfo;
