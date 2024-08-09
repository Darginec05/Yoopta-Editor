/* eslint-disable import/no-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/server.ts'],
    outDir: 'dist',
    format: ['esm'],
    platform: 'node',
    splitting: false,
    bundle: true,
    sourcemap: false,
    dts: false,
    clean: true,
  },
]);
