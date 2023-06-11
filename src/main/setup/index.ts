import initMaster, { InitMainMasterOptions } from './master';
import {
  createHome,
  createRecord,
} from '@common/services/windowService/windows';
import initAppSavePath from './appSavePath';

interface SetUpMainOptions extends InitMainMasterOptions {}

export default async function setupMain(
  options?: SetUpMainOptions
): Promise<void> {
  // remote模块注入
  require('@electron/remote/main').initialize();

  const master = await initMaster(options);

  // 应用存储路径
  const appSavePath = await initAppSavePath();
  master.appSavePath = appSavePath;  
  

  global.master = master;

  global.master.tools.log.info('the main process started successfully!');

  createHome();
  global.master.services.ipc.on('open.record.window', () => {
    createRecord();
  });
}
