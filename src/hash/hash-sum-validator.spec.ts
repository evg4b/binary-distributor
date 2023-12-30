import { createReadStream, createWriteStream } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { HashSumValidator } from './hash-sum-validator';

describe('hash-sum-validator', () => {
  const dataDir = resolve(process.cwd(), '.testdata');

  const md5Hashes: Record<string, string> = {
    'file-1.bin': '46bfb646dab150e8f902cab8921a55eb',
    'file-2.bin': '4e87ef433b71de3426c3ec5c15f2cd98',
    'file-3.bin': '22807258499b96e0192e2a6198aa5ffa',
    'file-4.bin': 'c6a70cb38946ad0bc660bfc044af5473',
    'file-5.bin': 'f43b8b8d20dddef7a7fe7c58a40fbad6',
  };

  const sha1Hashes: Record<string, string> = {
    'file-1.bin': 'd72da610b17c7a44ce31fd1f8a0e68da21567827',
    'file-2.bin': '04f8c52404e7774a3ec62b3884210e2bb52ce03f',
    'file-3.bin': '4c756fc1b9c650667777735a61d0c1ed45eb3d20',
    'file-4.bin': '28596e6aa677273d191f64c54e3b07ed0ec68b9f',
    'file-5.bin': '6752b77dc98a627e869d3a27d191b70b45e074a9',
  };

  const sha256Hashes: Record<string, string> = {
    'file-1.bin': '0a359dc750a2dc9d14fe87ef1adf4bb2dfe48ccbe8c753007e810a5f98560e58',
    'file-2.bin': '31b3a1e8c4eca61211ed1142b26f478460c5fcd4cde6556d663ea64a57afbc83',
    'file-3.bin': 'dc329d8a9a0faa5ad597a34c53a7dfa15b471c09d41217cecd7620b63277ef91',
    'file-4.bin': 'c6096a6bfbac5576275582611cf8372eef945ce5d1f8bff91e7513bf66ef17c3',
    'file-5.bin': '1ec89d717a8715687bb713114f897beb281416e8f22c348af2d60a454dbb3532',
  };

  const sha512Hashes: Record<string, string> = {
    'file-1.bin': '98f786961cee566c8422f1a820b8a1e4a68f48bbeaa22801d4bf6d8fce6a9bf9b788fadcd8b94f3d2fae5125305548f8edcfa6c77a2de889e0e17c86fb4d50ba',
    'file-2.bin': 'da1149098f9c905668deed8855d161c1c4f3973829eb8a11b9881ccc17d5a9e5fa25afb467494c50f5f0ef96e1b18d7f949aa9635e5b88a1d3efa721a2663517',
    'file-3.bin': '4b4bf7558659b5ae445f7eaa42697bc3b2d694ac62ae6adb6cd8370f5064f42ad7db8e3963cd102e5b67c08bdbc7c5f00cb8260228c6e3d1252059c40307c9d8',
    'file-4.bin': '38217889f88be0ae8ed15c8274ad30126ce19d722477ff372187972d5994418db1bd7948110e5ec47fd9e421d8f7b350b231c440eda2f8061866d00427211d98',
    'file-5.bin': 'ce7d42044d02a7f14f6839e15d2baaab66dc1c6644563d393f30c9016289d6393c6eafc7a9f9f9d6649a8a3148de57e2268cc754aa70f4707b7b45726120a98b',
  };

  const testCases = {
    md5: md5Hashes,
    sha1: sha1Hashes,
    sha256: sha256Hashes,
    sha512: sha512Hashes,
  };

  let tmpFiles: string[] = [];

  Object.entries(testCases)
    .forEach(([algorithm, hashes]) => {
      describe(`should validate ${ algorithm } hashes`, () => {
        Object.entries(hashes).forEach(([fileName, hash]) => {
          test(`should validate ${ fileName }`, async () => {
            const file = createReadStream(resolve(dataDir, fileName));
            const tmpFile = resolve(dataDir, fileName + '.copy');
            const writeStream = createWriteStream(tmpFile);
            const hashSumValidator = new HashSumValidator(algorithm, hash);
            await pipeline(file, hashSumValidator, writeStream);
            tmpFiles.push(tmpFile);
          }, 10_000);
        });
      });
    });

  afterEach(async () => {
    await Promise.all(tmpFiles.map(file => unlink(file)));
    tmpFiles = [];
  });
});
