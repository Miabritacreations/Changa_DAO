import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';

export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build';
  const isPreview = mode === 'preview';
  
  // Use different base paths for different environments
  const base = isProduction || isPreview ? '/Changa_DAO/' : '/';
  
  return {
    base,
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
    },
    preview: {
      port: 3000,
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
  };
});
