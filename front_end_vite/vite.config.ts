/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    port: 3000,
    strictPort: true
  },
  test: {
    dir: "tests",
    environment: "jsdom",
    setupFiles: './tests/setupTests.ts'
  }
});
