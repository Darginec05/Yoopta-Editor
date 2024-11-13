import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['cjs'],
  clean: true,
  sourcemap: true,
  onSuccess: process.env.NODE_ENV === 'development' ? 'node dist/server.js' : undefined,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
});
