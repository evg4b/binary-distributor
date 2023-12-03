import * as console from 'console';
import { basename, extname, resolve } from 'path';
import assert from "assert";
import { createWriteStream } from 'fs';
import { pipeline } from "stream/promises";
import { HashSumValidator } from "./hash-sum-validator";

export const installBinary = async (config: Configuration) => {
  console.log(`Installing binary for ${ config.name } v${ config.version }...`);
  const url = config.urlTemplate.replaceAll('{version}', config.version)
    .replaceAll('{name}', config.name);


  const binFile = resolve(config.packageDir, basename(config.name, extname(config.name)));
  const response = await fetch(url);
  assert(response.ok, `Failed to download binary from ${ url }`);
  assert(response.body, `Response body is empty`);
  // await verifyChecksum(response.body as any, 'sha256', '9c890ad028a9076d867237ce8e697fcb9e98edb6b116ccaecd556d74de700148')
  await pipeline(
    response.body as any,
    new HashSumValidator('sha256', '9c890ad028a9076d867237ce8e697fcb9e98edb6b116ccaecd556d74de7001481'),
  );
};


