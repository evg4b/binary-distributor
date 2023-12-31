import assert from 'assert';
import { dirname } from 'path';

export const validatePackageJson = (packageJson: PackageJson) => {
  assert(packageJson.name, 'package.json must have a name');
  assert(packageJson.version, 'package.json must have a version');
  const configuration = packageJson['binary-distributor'];
  assert(configuration, 'package.json must have a binary-distributor section');
  assert(configuration['url-template'], 'package.json must have a binary-distributor.url-template section');
};

export const extractConfiguration = (packageJsonPath: string): Configuration => {
  const packageJson = require(packageJsonPath) as PackageJson;
  validatePackageJson(packageJson);

  const rawConfiguration = packageJson['binary-distributor'];

  return {
    name: packageJson.name,
    version: packageJson.version,
    urlTemplate: rawConfiguration['url-template'],
    packageDir: dirname(packageJsonPath),
    hashAlgorithm: rawConfiguration.hashAlgorithm ?? 'sha256',
  };
};

