import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { devMainPlugin } from './plugins/vite-plugin-dev-main'
import { join } from 'path';

export default defineConfig({
  root: join(__dirname, 'src/render'),
  base: './',
  envDir: './',
  server: {
    port: 3000,
  },
  plugins: [
    devMainPlugin(),
    react()
  ],
})
