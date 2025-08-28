import react from '@vitejs/plugin-react';
 HEAD
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  
  return {
    base: isProduction && isGitHubPages ? '/Changa_DAO/' : '/',
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },

import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  base: '/Changa_DAO/',
  build: {
    emptyOutDir: true,
    outDir: 'dist',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
 3cb32b18e61f1f54f72dce288f955385ad27e594
      },
    },
    define: {
      'process.env': {},
    },
    server: {
      port: 5173,
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            dfinity: ['@dfinity/agent', '@dfinity/auth-client', '@dfinity/identity'],
          },
        },
      },
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
  };
});
