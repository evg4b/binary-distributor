import { extractConfiguration } from '../core/extract-configuration';
import { installBinary } from '../core/install-binary';

export const install: Action = async (packageJsonPath): Promise<void> => {
  const configuration = extractConfiguration(packageJsonPath);
  await installBinary(configuration);
};
