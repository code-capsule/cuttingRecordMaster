import { app, BrowserWindow } from 'electron';
import { createWindow } from './createWindow';
import setup from './setup';

function createHome() {
  createWindow({
    name: 'home',
    width: 1000,
    height: 800,
  });
}

function createRecord() {
  createWindow({
    name: 'record',
    width: 800,
    height: 600,
  });
}

app.whenReady().then(() => {
  setup();
  createHome();
  global.master.service.ipc.on('open.record.window', () => {
    createRecord();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createHome();
  }
});
