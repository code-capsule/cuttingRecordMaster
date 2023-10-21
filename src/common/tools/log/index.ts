import log from 'electron-log';
import path from 'path';

type TLogArg = string | number | boolean | object | undefined | null;
type TLogArgs = TLogArg[];

function initLog(logRootPath: string) {
  log.transports.console.useStyles = true;
  log.transports.file.resolvePath = (variables) => {
    return path.join(logRootPath, variables.fileName || '');
  };
  return log;
}

function getLogger(labels?: TLogArg | TLogArgs) {
  return {
    info: function(...args: TLogArgs) {
      global.master.tools.log.info(`${joinLoggerLabels(labels)}`, ...args);
    },
    error: function(...args: TLogArgs) {
      global.master.tools.log.error(`${joinLoggerLabels(labels)}`, ...args);
    },
  };
}

const joinLoggerLabels = (labels?: TLogArg | TLogArgs): string => {
  if (Object.prototype.toString.call(labels) === '[object String]') return `[${labels}]`;
  if (Object.prototype.toString.call(labels) === '[object Array]' && labels && ((labels as TLogArgs)?.length) > 0) {
    return (labels as TLogArg[]).map((lab: TLogArg) => `[${lab}]`)?.join('');
  }
  return '';
};

export { initLog, getLogger };