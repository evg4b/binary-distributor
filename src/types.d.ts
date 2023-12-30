type Action = (packageJsonPath: string) => Promise<void>;

interface PackageJson {
  name: string;
  version: string;
  'binary-distributor': RawConfiguration;
}

interface RawConfiguration {
  'url-template': string;
  hashAlgorithm?: string;
}

interface Configuration {
  name: string;
  version: string;
  urlTemplate: string;
  packageDir: string;
  hashAlgorithm: string;
}

type SupportedPlatforms = 'darwin' | 'linux' | 'win32' | 'cygwin';
