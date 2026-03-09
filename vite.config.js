import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: false, gzipSize: true, brotliSize: true })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate heavy libraries into separate chunks for better caching
          'vendor-framer': ['framer-motion'],
          'vendor-router': ['react-router-dom'],
        },
      },
    },
    // More aggressive tree-shaking and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3, // Multiple compression passes
        drop_debugger: true,
        drop_console: process.env.NODE_ENV === 'production',
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
})
