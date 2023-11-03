import windowService from '../../index';
import { SCREEN_CAMERA_PROCESS_KEY } from '@common/constants/processKey';

export function registerScreenCamera() {
  windowService.register(SCREEN_CAMERA_PROCESS_KEY, {
    width: 320,
    height: 180,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
}
