import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from outside the container
    port: 5173,
    watch: {
      usePolling: true, // Enable polling for file changes in Docker
    },
  },
})
