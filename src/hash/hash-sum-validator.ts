import { BinaryLike, createHash, Hash } from 'crypto';
import { Transform } from 'stream';

type Callback = (error?: Error | null, data?: unknown) => void;

export class HashSumValidator extends Transform {
  private hash: Hash;

  constructor(algorithm: string, private hashSum: string) {
    super();
    this.hash = createHash(algorithm);
  }

  public override _transform(chunk: BinaryLike, _: BufferEncoding, callback: Callback) {
    try {
      this.hash.update(chunk);
      callback(null, chunk);
    } catch (error) {
      callback(error as Error);
    }
  }

  public override _flush(callback: Callback) {
    const actualSum = this.hash.digest('hex');
    if (actualSum.toLowerCase() !== this.hashSum.toLowerCase()) {
      callback(new Error(`Checksum mismatch: expected ${ this.hashSum }, got ${ actualSum }`));
      return;
    }

    callback();
  }
}
