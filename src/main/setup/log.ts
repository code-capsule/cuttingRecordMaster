import dayjs from 'dayjs';
import path from 'path';
import { app } from 'electron';
import { initLog } from '@common/tools/log';

function initMainLog() {
  const _path = path.join(app.getPath('logs'), dayjs().format('YYYY-MM-DD'));
  return initLog(_path);
}

export default initMainLog;
