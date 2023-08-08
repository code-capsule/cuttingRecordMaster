import { RECORD_PROCESS_KEY } from '@src/common/constants/processKey';
import { getLogger } from '@common/tools/log';
const log = getLogger('setWindowIgnoreMouseEvent');

interface ISetIgnoreMouseEventParams {
  /**
   * 是否可被穿透，true 为可穿透
   */
  ignore: boolean;
  /**
   * 渲染进程的 key, 默认为 'record'
   */
  processKey?: string;
}

/**
 * 设置窗口是否可被穿透
 * @param ignore 是否可被穿透，true 为可穿透
 * @param processKey 渲染进程的 key
 */
export const setWindowIgnoreMouseEvent = (params: ISetIgnoreMouseEventParams): void => {
  const { ignore, processKey = RECORD_PROCESS_KEY } = params;
  const instance = window.master.services.windowService.get(processKey).getInstance();
  if (!instance) {
    const error = `can not find browserWindow, the processKey is invalid, ${processKey}`;
    log.error(error);
    return;
  }
  log.info(`setWindowIgnoreMouseEvent, ignore: ${ignore}, processKey: ${processKey}`);
  if (ignore) {
    instance.setIgnoreMouseEvents(true, { forward: true });
  } else {
    instance.setIgnoreMouseEvents(false);
  }
};
