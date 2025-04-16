import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    sourcemap: true,
    terserOptions: {
      compress: {
        // Preserve console.logs for debugging
        drop_console: false,
      },
    },
  },
})
