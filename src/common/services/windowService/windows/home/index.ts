import windowService from '../../index';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';

export function registerHome() {
  windowService.register(HOME_PROCESS_KEY, {
    width: 1280,
    height: 720,
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

export function createHome() {
  windowService.create(HOME_PROCESS_KEY);
}
