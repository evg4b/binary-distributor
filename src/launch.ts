import { execFileSync } from 'child_process';
import { resolve } from 'path';
import process from 'process';
import { extractConfiguration } from './core/extract-configuration';

export const launch = (dir: string): void => {
  const configuration = extractConfiguration(resolve(dir, 'package.json'));
  const bin = resolve(configuration.packageDir, configuration.name);

  execFileSync(bin, process.argv, {
    stdio: 'inherit',
    cwd: process.env.INIT_CWD,
    encoding: 'utf-8',
    env: process.env,
  });
};
