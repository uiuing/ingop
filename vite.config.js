import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

const path = require('path')

export default defineConfig({
  server: {
    port: 5100
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  plugins: [
    vue(),
    eslintPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
