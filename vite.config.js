import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { devMainPlugin }  from './plugins/vite-plugin-dev-main'

export default defineConfig({
  plugins: [
    devMainPlugin(),
    react()
  ],
})
