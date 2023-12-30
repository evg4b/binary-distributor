import { defineConfig } from 'tsup';

console.log('process.env.NODE_ENV');
console.log(process.env.NODE_ENV);
console.log('process.env.NODE_ENV');

const isProd = process.env.NODE_ENV === 'production';
console.log('isProd', isProd);

export default defineConfig({
  entry: [
    'src/cli.ts',
    'src/run.ts'
  ],
  splitting: false,
  sourcemap: !isProd,
  clean: true,
  target: 'node18',
  minify: isProd,
  format: 'cjs',
  dts: false,
  minifySyntax: isProd,
  minifyWhitespace: isProd,
  minifyIdentifiers: isProd,
  platform: 'node',
  treeshake: isProd,
  bundle: isProd,
});
