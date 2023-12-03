import * as console from 'console';
import { basename, resolve } from 'path';
import { Readable } from 'stream';
import assert from "assert";
import { createWriteStream } from 'fs';

export const installBinary = async (config: Configuration) => {
  console.log(`Installing binary for ${ config.name } v${ config.version }...`);
  const url = config.urlTemplate.replaceAll('{version}', config.version)
    .replaceAll('{name}', config.name);

  const binFile = resolve(config.packageDir, basename(config.name));
  const response = await fetch(url);
  assert(response.ok, `Failed to download binary from ${ url }`);
  assert(response.body, `Response body is empty`);

  Readable.from(response.body).pipe(createWriteStream(binFile));
};
