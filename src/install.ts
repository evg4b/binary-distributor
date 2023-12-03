import { extractConfiguration } from './extract-configuration';
import { installBinary } from './install-binary';

export const install: Action = async (packageJsonPath): Promise<void> => {
  const configuration = extractConfiguration(packageJsonPath);
  await installBinary(configuration);
};
