import { app, BrowserWindow } from 'electron';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';
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
    global.master.services.windowService.create(HOME_PROCESS_KEY);
  }
});
