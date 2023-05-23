import IpcEventEmitter from './events';
import { IBaseIpc, IBaseIpcProps, IIpcLogger, EIpcNamespace, IProcessMessagePortMap, IPortChannelMap, IHandleMessageParams, IIpcMessage, IPortChannelCallback, TPortChannelHandler, IIpcEventEmitter, IRequestResponse, TProcessKey } from '../typings';
import { CHANNEL_REQUEST } from '../constants';
import { generateMessageCtx, generateIpcMessage } from '../utils/message';
import { timeoutWrap } from '../utils/timeout';

export default class BaseIpc implements IBaseIpc {
  public namespace = EIpcNamespace.Render;
  public processMessagePortMap: IProcessMessagePortMap = {};
  public portChannelMap: IPortChannelMap = {};
  public eventEmitter: IIpcEventEmitter = new IpcEventEmitter();
  public processKey: TProcessKey = '';
  public logger: IIpcLogger = { info: console.log, error: console.error };

  constructor(props: IBaseIpcProps) {
    this._initLogger(props);
    this.initProcessKey(props.processKey);
  }

  public initProcessKey = (processKey: TProcessKey): void => {
    if (!processKey) {
      const error = 'init render ipc error, process key is invalid';
      this.logger.error(error);
      throw new Error(error);
    }
    this.processKey = processKey;
  };

  /**
   * 1、遍历现在已有的所有 ipc，并使用他们的 port 发送消息
   * 2、触发 eventEmitter 的 emit 事件，为了解决当前进程给自己发消息
   * @param channel
   * @param args
   */
  public send = (channel: string, args?: any) => {
    const finalMessage = generateIpcMessage(channel, args);
    this.logger.info('[send]', finalMessage);
    this._sendToPort(finalMessage);
    this.eventEmitter.emit(channel, finalMessage);
  };

  public on = (channel: string, handler: TPortChannelHandler | IPortChannelCallback, once?: boolean): void => {
    if (!this.portChannelMap[channel]) {
      this.portChannelMap[channel] = {
        callbacks: [],
      };
    }

    let messageListener: IPortChannelCallback;
    if (typeof handler === 'function') {
      messageListener = {
        handler,
        once,
      };
    } else {
      messageListener = handler;
    }

    this.portChannelMap[channel].callbacks.push(messageListener);
    this.eventEmitter.on(channel, messageListener);
  };

  public once = (channel: string, handler: TPortChannelHandler | IPortChannelCallback): void => {
    this.on(channel, handler, true);
  };

  public off = (channel: string, handler?: Function) => {
    this._executeRemoveListener(channel, handler);
  };

  public removeListener = (channel: string, handler?: Function) => {
    this._executeRemoveListener(channel, handler);
  };

  /**
   * 请求消息
   * @param channel 要请求的事件名
   * @param timeout TODO 待实现，超时时间
   * @param args 参数
   */
   public request = async (channel: string, timeout?: number | 'infinite', args?: any): Promise<void> => {
    const finalMessage = generateIpcMessage(channel, args);
    this.logger.info('[request]', finalMessage);
    let _timeout = timeout;
    if (!_timeout) {
      _timeout = 15000;
    }
    let requestWrap: Promise<any>;
    if (typeof _timeout === 'number') {
      requestWrap = timeoutWrap(this._request, _timeout, finalMessage);
    } else {
      requestWrap = Promise.race([this._request(finalMessage)]);
    }
    return requestWrap.then(
      (res) => {
        return res;
      },
      (error) => {
        this.logger.error(`channel: ${channel}, request is timeout: ${_timeout}ms, args: `, args);
        return error;
      },
    );
  };

  public handleMessage = (params: IHandleMessageParams): void => {
    const { message } = params;
    const { channel, targetId } = message;

    if ((targetId !== undefined && targetId !== null && targetId !== '') && targetId !== this.processKey) {
      this.logger.info(`the targetId is mismatch, channel is ${channel}, targetId:`, targetId, this.processKey);
      return;
    }

    if (this.portChannelMap[channel]?.callbacks) {
      this._executePortChannelCallbacks(params);
    }
  };

  private _initLogger = (params: IBaseIpcProps): void => {
    const { hasLog = true, logger } = params;

    if (!hasLog) {
      this.logger = {
        info: () => {},
        error: () => {},
      }
      return;
    }

    if (logger?.info) {
      this.logger.info = logger.info;
    }
    if (logger?.error) {
      this.logger.error = logger.error;
    }
  };

  private _request = (message: IIpcMessage): Promise<void> => {
    const { headers } = message;
    return new Promise((resolve) => {
      this.once(CHANNEL_REQUEST, {
        handler: (ctx, result) => {
          this.logger.info('[request result], message is :', message, 'result is: ', result);
          resolve(result);
        },
        reqId: headers.reqId,
      });
      this._sendToPort(message);
      this._ownSend(message);
    });
  };

  private _ownSend = (message: IIpcMessage): void => {
    const resolveHandle = (response: IRequestResponse): void => {
      this.eventEmitter.emit(CHANNEL_REQUEST, {
        channel: CHANNEL_REQUEST,
        ...response,
      });
    };
    this.handleMessage({ message, resolveHandle });
  };

  private _sendToPort = (message: IIpcMessage): void => {
    for (const [key, processMessagePort] of Object.entries(this.processMessagePortMap)) {
      processMessagePort.messagePort?.postMessage(message);
    }
  };

  private _executePortChannelCallbacks = (params: IHandleMessageParams): void => {
    const { message } = params;
    const { channel, headers } = message;
    const callbacks = this.portChannelMap[channel]?.callbacks;
    const ctx = generateMessageCtx(params);
    const { data } = ctx;
    callbacks.forEach((callback) => {
      const callbackReqId = callback.reqId;
      // 若是这个函数有 reqId 且和此次消息的 reqId 不相等，则不执行任何东西
      if (callbackReqId && callbackReqId !== headers.reqId) {
        return;
      }
      callback.handler && callback.handler(ctx, data?.body);
      if (callback.once) {
        this.removeListener(channel, callback.handler);
      }
    });
  };

  private _executeRemoveListener = (channel: string, handler?: Function): void => {
    if (this.portChannelMap[channel]) {
      this._removeChannelCallback(channel, handler);
      handler && this.eventEmitter.removeListener(channel, handler);
    } else {
      this.logger.error(`non-existent channel[${channel}] need removeListener`);
    }
  };

  private _removeChannelCallback = (channel: string, handler?: Function): void => {
    if (!handler) {
      delete this.portChannelMap[channel];
    } else {
      this._removeChannelTargeCallback(channel, handler);
    }
  };

  private _removeChannelTargeCallback = (channel: string, handler: Function): void => {
    this.portChannelMap[channel].callbacks?.forEach((cbItem: IPortChannelCallback, index: number) => {
      if (cbItem.handler === handler) {
        this.portChannelMap[channel].callbacks.splice(index, 1);
      }
    });
  };
}
