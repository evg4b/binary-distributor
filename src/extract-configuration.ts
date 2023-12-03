import assert from 'assert';
import { dirname } from 'path';

const validatePackageJson = (packageJson: PackageJson) => {
  assert(packageJson.name, 'package.json must have a name');
  assert(packageJson.version, 'package.json must have a version');
  assert(packageJson['binary-distributor'], 'package.json must have a binary-distributor section');
  assert(
    packageJson['binary-distributor']['url-template'],
    'package.json must have a binary-distributor.url-template section'
  );
};

export const extractConfiguration = (packageJsonPath: string): Configuration => {
  const packageJson = require(packageJsonPath) as PackageJson;
  validatePackageJson(packageJson);

  const rawConfiguration = packageJson['binary-distributor'];

  return {
    name: packageJson.name,
    version: packageJson.version,
    urlTemplate: rawConfiguration['url-template'],
    packageDir: dirname(packageJsonPath)
  };
};

