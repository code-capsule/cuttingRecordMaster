import { buildMain, mainOutPath } from "../scripts/build.main";

export const devMainPlugin = () => {
  return {
    name: "vite-plugin-dev-main",
    configureServer(server) {
      buildMain();
      server.httpServer.once("listening", () => {
        let { spawn } = require("child_process");
        let electronProcess = spawn(
          require("electron").toString(),
          [mainOutPath, "--inspect=9229", "--remote-debugging-port=9222", "--env=dev"],
          {
            cwd: process.cwd(),
            stdio: "inherit",
          }
        );
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
        server.httpServer.once("close", () => {
          electronProcess.close();
          process.exit();
        });
      });
    },
  };
};
