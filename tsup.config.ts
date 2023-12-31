import { defineConfig } from 'tsup';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  entry: [
    'src/cli.ts',
    'src/launch.ts',
  ],
  splitting: false,
  sourcemap: !isProd,
  target: 'node18',
  minify: isProd,
  outDir: 'dist',
  format: 'cjs',
  dts: isProd,
  platform: 'node',
  bundle: true,
  minifySyntax: isProd,
});
