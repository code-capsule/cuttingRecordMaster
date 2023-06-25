import windowService from '../../index';
import { LOGIN_PROCESS_KEY } from '@common/constants/processKey';

export function registerLogin() {
  windowService.register(LOGIN_PROCESS_KEY, {
    width: 960,
    height: 600,
    frame: false,
    transparent: false,
    resizable: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
}

export function createLogin() {
  windowService.create(LOGIN_PROCESS_KEY);
}
