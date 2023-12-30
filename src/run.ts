import { resolve } from "path";
import { extractConfiguration } from "./extract-configuration";
import { execFileSync } from 'child_process';
import * as process from "process";
import { verifyInstallation } from "./verify-installation";
import assert from "assert";

(async (): Promise<void> => {
  const packageJsonPath = process.env['npm_package_json'];
  assert(!!packageJsonPath, 'Environment variable npm_package_json is not set');

  const configuration = extractConfiguration(packageJsonPath);
  const bin = resolve(configuration.packageDir, configuration.name);
  await verifyInstallation(configuration);
  execFileSync(bin, process.argv, {
    stdio: 'inherit',
    cwd: process.env.INIT_CWD,
    encoding: 'utf-8',
    env: process.env,
  });
})();
