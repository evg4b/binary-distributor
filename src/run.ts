import assert from 'assert';
import { execFileSync } from 'child_process';
import { resolve } from 'path';
import * as process from 'process';
import { extractConfiguration } from './extract-configuration';

(async (): Promise<void> => {
  const packageJsonPath = process.env['npm_package_json'];
  assert(!!packageJsonPath, 'Environment variable npm_package_json is not set');

  const configuration = extractConfiguration(packageJsonPath);
  const bin = resolve(configuration.packageDir, configuration.name);

  execFileSync(bin, process.argv, {
    stdio: 'inherit',
    cwd: process.env.INIT_CWD,
    encoding: 'utf-8',
    env: process.env,
  });
})();
