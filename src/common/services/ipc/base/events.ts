const Event = require('events');
import {
  IIpcEventEmitter,
  IPortChannelCallback,
  IIpcMessage,
  IIpcMessageCtx,
  IIpcEventEmitterListenerMap,
  IIpcEventEmitterListenerMapItem,
} from '../typings';

export default class IpcEventEmitter implements IIpcEventEmitter {
  public listenerMap: IIpcEventEmitterListenerMap = {};
  public eventEmitter: typeof Event = new Event();

  public emit = (channel: string, message: IIpcMessage): void => {
    this.eventEmitter.emit(channel, message);
  };

  public on = (channel: string, messageListener: IPortChannelCallback): void => {
    const { handler, once } = messageListener;
    const callbackReqId = messageListener.reqId;
    const listener = (message: IIpcMessage): void => {
      const { channel, headers, data } = message;
      // 若是这个函数有 reqId 且和此次消息的 reqId 不相等，则不执行任何东西
      if (callbackReqId && callbackReqId !== headers.reqId) {
        return;
      }
      const ctx: IIpcMessageCtx = {
        channel,
        headers,
        request: { resolve: (result: any) => {} }, // 反正不会用
      };
      handler(ctx, data?.body);
      if (once) {
        this.removeListener(channel, handler);
      }
    };

    if (!this.listenerMap[channel] || this.listenerMap[channel].length <= 0) {
      this.listenerMap[channel] = [];
    }
    this.listenerMap[channel].push({
      handler,
      listener,
    });
    this.eventEmitter.on(channel, listener);
  };

  public removeListener = (channel: string, handler?: Function): void => {
    if (!this.listenerMap[channel] || this.listenerMap[channel].length <= 0) {
      return;
    }
    if (!handler) {
      this.eventEmitter.removeAllListeners(channel);
      this.listenerMap[channel] = [];
      return;
    }
    this.listenerMap[channel].forEach((cbItem: IIpcEventEmitterListenerMapItem, index: number) => {
      if (cbItem.handler === handler) {
        this.listenerMap[channel].splice(index, 1);
        this.eventEmitter.removeListener(channel, cbItem.listener);
      }
    });
  };
}
