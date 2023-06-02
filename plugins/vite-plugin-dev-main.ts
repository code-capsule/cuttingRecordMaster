import { Plugin } from 'vite'
import { buildMain, mainOutPath } from '../scripts/build.main'

export const devMainPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-dev-main',
    configureServer(server) {
      buildMain()
      server.httpServer?.once('listening', () => {
        const { spawn } = require('child_process')
        const electronProcess = spawn(
          require('electron').toString(),
          [mainOutPath, '--inspect=9229', '--remote-debugging-port=9222', "--env=dev"],
          {
            cwd: process.cwd(),
            stdio: 'inherit',
          }
        )
        electronProcess.on('close', () => {
          server.close()
          process.exit()
        })
        server.httpServer?.once('close', () => {
          electronProcess.close()
          process.exit()
        })
      })
    },
  }
}
