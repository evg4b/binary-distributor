import assert from 'assert';
import { basename, extname } from 'path';
import * as process from 'process';
import { pipeline } from 'stream/promises';
import { extract as extractTar } from 'tar';
import { createGunzip } from 'zlib';
import { HashSumValidator } from '../hash/hash-sum-validator';

const winExt = '.zip';
const unitExt = '.tar.gz';

const preferredExtensions: Partial<Record<NodeJS.Platform, string>> = {
  cygwin: winExt,
  darwin: unitExt,
  linux: unitExt,
  win32: winExt,
};

export const installBinary = async (config: Configuration) => {
  console.log(`Installing binary for ${ config.name } v${ config.version }...`);
  const ext = preferredExtensions[process.platform];
  assert(ext, `Unsupported platform: ${ process.platform }`);

  const url = config.urlTemplate.replaceAll('{version}', config.version)
    .replaceAll('{name}', config.name)
    .replaceAll('{platform}', process.platform)
    .replaceAll('{arch}', process.arch)
    .replaceAll('{ext}', ext);

  // const binFile = resolve(config.packageDir, basename(config.name, extname(config.name)));
  const response = await fetch(url);
  assert(response.ok, `Failed to download binary from ${ url }: ${ response.status } ${ response.statusText }`);
  assert(response.body, 'Response body is empty');

  await pipeline(
    response.body as any,
    new HashSumValidator(config.hashAlgorithm, '9c890ad028a9076d867237ce8e697fcb9e98edb6b116ccaecd556d74de700148'),
    ...extractTarGz(config.packageDir, basename(config.name, extname(config.name))),
  );
};

const extractTarGz = (dir: string, file: string): Array<NodeJS.ReadWriteStream | NodeJS.WritableStream> => {
  return [createGunzip(), extractTar({ cwd: dir }, [file])];
};
