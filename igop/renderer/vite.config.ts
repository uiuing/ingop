import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  server: {
    port: 5000
  },
  build: {
    outDir: '../out/renderer/dist'
  }
})
