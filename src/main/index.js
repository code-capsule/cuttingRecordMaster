import { app, BrowserWindow } from 'electron'
import { createWindow } from './createWindow';

function createHome() {
  createWindow({
    name: 'home',
    width: 1000,
    height: 800,
  })
}

app.whenReady().then(() => {
  createHome()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createHome()
  }
})