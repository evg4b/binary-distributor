import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/cli.ts',
    'src/run.ts'
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'node18',
});
