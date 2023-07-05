import windowService from '../../index';
import { LOGIN_PROCESS_KEY } from '@common/constants/processKey';

export function registerLogin() {
  windowService.register(LOGIN_PROCESS_KEY, {
    width: 768,
    height: 480,
    frame: false,
    transparent: true,
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
