import log from 'electron-log';
import path from 'path';

function initLog(logRootPath: string) {
  log.transports.console.useStyles = true;
  log.transports.file.resolvePath = (variables) => {
    return path.join(logRootPath, variables.fileName || '');
  };
  return log;
}

export default initLog;
