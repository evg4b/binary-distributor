import assert from 'assert';
import { basename, extname } from 'path';
import process from 'process';
import { pipeline } from 'stream/promises';
import { extract as extractTar } from 'tar';
import { createGunzip } from 'zlib';


export const installBinary = async (config: Configuration) => {
  console.log(`Installing binary for ${ config.name } v${ config.version }...`);

  const url = config.urlTemplate.replaceAll('{version}', config.version)
    .replaceAll('{name}', config.name)
    .replaceAll('{platform}', process.platform)
    .replaceAll('{arch}', process.arch);

  const response = await fetch(url);
  assert(response.ok, `Failed to download binary from ${ url }: ${ response.status } ${ response.statusText }`);
  assert(response.body, 'Response body is empty');

  await pipeline(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.body as any,
    ...extractTarGz(config.packageDir, basename(config.name, extname(config.name))),
  );
};

const extractTarGz = (dir: string, file: string): Array<NodeJS.ReadWriteStream | NodeJS.WritableStream> => {
  return [createGunzip(), extractTar({ cwd: dir }, [file])];
};
