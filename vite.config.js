import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'https://api.tiengtrungbackinh.store',
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
});