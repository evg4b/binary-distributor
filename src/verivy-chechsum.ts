import { createHash } from "crypto";
import type { Readable } from "stream";
import { pipeline } from 'stream/promises';
import assert from "assert";

export const verifyChecksum = async (stream: Readable, algorithm: string, hashSum: string): Promise<void> => {
  const hashStream = createHash(algorithm);
  await pipeline(stream, hashStream);
  const actualSum = hashStream.digest('hex');
  assert(actualSum === hashSum, `Checksum mismatch: expected ${ hashSum }, got ${ actualSum }`);
  console.log(`Checksum verified: ${ actualSum }`);
}
