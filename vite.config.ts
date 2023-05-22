import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { devMainPlugin } from './plugins/vite-plugin-dev-main'
import { join } from 'path'

export default defineConfig({
  root: join(__dirname, 'src/render'),
  base: './',
  envDir: './',
  server: {
    port: 3000,
  },
  plugins: [devMainPlugin(), react()],
  resolve: {
    alias: {
      '@addon': join(__dirname, 'src/addon'),
      '@common': join(__dirname, 'src/common'),
      '@config': join(__dirname, 'src/config'),
      '@main': join(__dirname, 'src/main'),
      '@render': join(__dirname, 'src/render'),
      '@static': join(__dirname, 'src/static'),
    },
  },
})
