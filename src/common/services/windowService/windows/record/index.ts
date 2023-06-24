import windowService from '../../index';
import { RECORD_PROCESS_KEY } from '@common/constants/processKey';

export function registerRecord() {
  windowService.register(RECORD_PROCESS_KEY, {
    width: 880,
    height: 466,
    frame: false,
    vibrancy: 'light',
    visualEffectState: 'active',
    transparent: true,
    resizable: false,
  });
}

export function createRecord() {
  windowService.create(RECORD_PROCESS_KEY);
}
