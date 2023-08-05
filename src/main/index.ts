import { app, BrowserWindow } from 'electron';
import { createLogin } from '@common/services/windowService/windows';
import setupMain from './setup';

app.whenReady().then(async () => {
  await setupMain();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLogin();
  }
});
