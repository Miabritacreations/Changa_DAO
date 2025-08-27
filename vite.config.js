import react from '@vitejs/plugin-react';
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
