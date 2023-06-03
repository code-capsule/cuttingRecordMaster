const { buildSync } = require('esbuild');
const mainEntryPath = './src/main/index.ts';
const mainOutPath = './dist/index.js';

function buildMain() {
  buildSync({
    entryPoints: [mainEntryPath],
    bundle: true,
    platform: 'node',
    outfile: mainOutPath,
    external: ['electron'],
  });
}

export { mainOutPath, buildMain };
