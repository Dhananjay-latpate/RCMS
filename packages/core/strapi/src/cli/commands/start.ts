import { createCommand } from 'commander';
import fs from 'fs';
import tsUtils from '@resillix/typescript-utils';
import { createStrapi } from '@resillix/core';

import type { StrapiCommand } from '../types';
import { runAction } from '../utils/helpers';

const action = async () => {
  const appDir = process.cwd();

  const isTSProject = await tsUtils.isUsingTypeScript(appDir);

  const outDir = await tsUtils.resolveOutDir(appDir);
  const distDir = isTSProject ? outDir : appDir;

  const buildDirExists = fs.existsSync(outDir);
  if (isTSProject && !buildDirExists)
    throw new Error(
      `${outDir} directory not found. Please run the build command before starting your application`
    );

  createStrapi({ appDir, distDir }).start();
};

/**
 * `$ strapi start`
 */
const command: StrapiCommand = () => {
  return createCommand('start')
    .description('Start your Resillix CMS application')
    .action(runAction('start', action));
};

export { command };
