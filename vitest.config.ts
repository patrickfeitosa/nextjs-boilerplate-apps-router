import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.types.ts',
        'src/app/**',
        'src/test/**',
        'src/types/**',
        'src/styles/**',
      ],
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
    },
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
  },
});
