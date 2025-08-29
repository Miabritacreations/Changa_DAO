import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';

export default defineConfig({
  // Remove base path for local development
  // base: '/Changa_DAO/',
  build: {
    emptyOutDir: true,
    outDir: 'dist',
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
  server: {
    port: 5173,
    host: true,
    strictPort: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  define: {
    'process.env': {},
  },
  plugins: [
    react(),
    environment({
      prefix: 'CANISTER_',
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
