import { createCommand } from 'commander';
import { type StrapiCloudCommand } from '../types';
import { runAction } from '../utils/helpers';
import action from './action';

/**
 * `$ create project in Resillix CMS cloud`
 */
const command: StrapiCloudCommand = ({ ctx }) => {
  return createCommand('cloud:create-project')
    .description('Create a Resillix CMS Cloud project')
    .option('-d, --debug', 'Enable debugging mode with verbose logs')
    .option('-s, --silent', "Don't log anything")
    .action(() => runAction('cloud:create-project', action)(ctx));
};

export default command;
