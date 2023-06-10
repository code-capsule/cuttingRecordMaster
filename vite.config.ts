import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devMainPlugin } from './plugins/vite-plugin-dev-main';
import svgr from 'vite-plugin-svgr';
import commonjs from 'vite-plugin-commonjs-externals';
import { join } from 'path';

const commonjsPackages = ['path', 'electron-log', 'lodash', 'electron-redux'];

export default defineConfig({
  root: join(__dirname, 'src/render'),
  base: './',
  envDir: './',
  server: {
    port: 3000,
  },
  plugins: [
    devMainPlugin(),
    commonjs({ externals: commonjsPackages }),
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@typings': join(__dirname, 'src/typings'),
      '@addon': join(__dirname, 'src/addon'),
      '@common': join(__dirname, 'src/common'),
      '@config': join(__dirname, 'src/config'),
      '@main': join(__dirname, 'src/main'),
      '@render': join(__dirname, 'src/render'),
      '@static': join(__dirname, 'src/static'),
    },
  },
});
