import windowService from '../../index';
import { screen } from 'electron';
import { CLIP_PROCESS_KEY } from '@common/constants/processKey';

export function registerClip() {
    const size = screen.getPrimaryDisplay()?.workAreaSize;
  windowService.register(CLIP_PROCESS_KEY, {
    x: 0,
    y: 0,
    width: size?.width,
    height: size?.height,
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

export function createClip() {
  windowService.create(CLIP_PROCESS_KEY);
}
