import windowService from '../../index';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';

export function registerHome() {
  windowService.register(HOME_PROCESS_KEY, {
    width: 1000,
    height: 800,
  });
}
