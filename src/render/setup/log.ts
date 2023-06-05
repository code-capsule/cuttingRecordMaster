import dayjs from 'dayjs';
import path from 'path';
const remote = require('@electron/remote');
import { initLog } from '@common/tools/log';

function initRenderLog() {
  const _path = path.join(
    remote.app.getPath('logs'),
    dayjs().format('YYYY-MM-DD')
  );
  return initLog(_path);
}

export default initRenderLog;
