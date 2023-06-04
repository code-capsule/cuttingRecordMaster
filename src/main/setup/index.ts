import initMaster, { InitMainMasterOptions } from './master';
import {
  createHome,
  createRecord,
} from '@common/services/windowService/windows';

interface SetUpMainOptions extends InitMainMasterOptions {}

export default async function setupMain(
  options?: SetUpMainOptions
): Promise<void> {
  require('@electron/remote/main').initialize();

  const master = await initMaster(options);
  global.master = master;

  global.master.tools.log.info('the main process started successfully!');

  createHome();
  global.master.services.ipc.on('open.record.window', () => {
    createRecord();
  });
}
