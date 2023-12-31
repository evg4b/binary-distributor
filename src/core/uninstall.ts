import { unlink } from 'node:fs/promises';
import { resolve } from 'path';
import { extractConfiguration } from './extract-configuration';

export const uninstall: Action = async (packageJsonPath): Promise<void> => {
  const configuration = extractConfiguration(packageJsonPath);
  const binPath = resolve(configuration.packageDir, configuration.name);
  console.log(`Uninstalling ${configuration.name}...`);

  await unlink(binPath);
};
