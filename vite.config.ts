import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression(),
    checker({
      typescript: true,
      overlay: false
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('/three')) {
              return 'three'
            }

            if (id.includes('/framer-motion')) {
              return 'framer-motion'
            }

            return 'vendor'
          }

          if (id.includes('/assets')) {
            return 'assets'
          }

          if (id.includes('src/')) {
            return 'app'
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
