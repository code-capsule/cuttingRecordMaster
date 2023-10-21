import windowService from '../../index';
import { RECORD_PROCESS_KEY } from '@common/constants/processKey';

export function registerRecord() {
  windowService.register(RECORD_PROCESS_KEY, {
    width: 800,
    height: 600,
  });
}
