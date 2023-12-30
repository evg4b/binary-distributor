import { createHash, Hash } from 'crypto';
import { Transform } from 'stream';

export class HashSumValidator extends Transform {
  private hash: Hash;

  constructor(algorithm: string, private hashSum: string) {
    super();
    this.hash = createHash(algorithm);
  }

  public override _transform(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null, data?: any) => void) {
    try {
      this.hash.update(chunk);
      callback(null, chunk);
    } catch (error) {
      callback(error as Error);
    }
  }

  public override _flush(callback: (error?: Error | null, data?: any) => void) {
    const actualSum = this.hash.digest('hex');
    if (actualSum.toLowerCase() !== this.hashSum.toLowerCase()) {
      callback(new Error(`Checksum mismatch: expected ${ this.hashSum }, got ${ actualSum }`));
      return;
    }

    callback();
  }
}
