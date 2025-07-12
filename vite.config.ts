import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression(),
    checker({
      typescript: true,
      overlay: false,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('src/assets')) {
            return 'assets';
          }

          if (id.includes('src')) {
            return 'app';
          }

          if (id.includes('node_modules')) {
            if (
              id.includes('framer-motion') ||
              id.includes('motion-dom') ||
              id.includes('motion-utils')
            ) {
              return 'framer-motion';
            }

            if (
              id.includes('/react/') ||
              id.includes('react-reconciler') ||
              id.includes('/suspend-react/') ||
              id.includes('/prop-types/')
            ) {
              return 'react';
            }

            if (id.includes('leaflet')) {
              return 'leaflet';
            }

            if (id.includes('@reduxjs/toolkit') || id.includes('redux')) {
              return 'redux';
            }

            if (id.includes('axios')) {
              return 'axios';
            }

            if (id.includes('react-router')) {
              return 'router';
            }

            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
