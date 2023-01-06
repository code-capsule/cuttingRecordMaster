const mainEntryPath = './src/main/index.js';
const mainOutPath = './dist/index.js';

export const devMainPlugin = () => {
  return {
    name: "vite-plugin-dev-main",
    configureServer(server) {
      require("esbuild").buildSync({
        entryPoints: [mainEntryPath],
        bundle: true,
        platform: "node",
        outfile: mainOutPath,
        external: ["electron"],
      });
      server.httpServer.once("listening", () => {
        let { spawn } = require("child_process");
        let electronProcess = spawn(
          require("electron").toString(),
          [
            mainOutPath,
            '--inspect=9229',
            '--remote-debugging-port=9222',
          ],
          {
          cwd: process.cwd(),
          stdio: "inherit",
        });
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};