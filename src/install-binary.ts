import { basename, extname } from 'path';
import assert from 'assert';
import { pipeline } from 'stream/promises';
import { HashSumValidator } from './hash-sum-validator';
import { createGunzip } from 'zlib';
import { extract as extractTar } from 'tar';

export const installBinary = async (config: Configuration) => {
  console.log(`Installing binary for ${ config.name } v${ config.version }...`);
  const url = config.urlTemplate.replaceAll('{version}', config.version)
    .replaceAll('{name}', config.name);


  // const binFile = resolve(config.packageDir, basename(config.name, extname(config.name)));
  const response = await fetch(url);
  assert(response.ok, `Failed to download binary from ${ url }`);
  assert(response.body, 'Response body is empty');


  console.log(extname(url))
  console.log(basename(url, extname(url)));

  await pipeline(
    response.body as any,
    new HashSumValidator(config.hashAlgorithm, '9c890ad028a9076d867237ce8e697fcb9e98edb6b116ccaecd556d74de700148'),
    ...extractTarGz(config.packageDir, basename(config.name, extname(config.name))),
  );
};

const extractTarGz = (dir: string, file: string): Array<NodeJS.ReadWriteStream | NodeJS.WritableStream> => {
  return [createGunzip(), extractTar({ cwd: dir }, [file])]
}
