import { IIpcMessage, IPortChannelCallback } from './index';
/**
 * ipc 内部的 emitter
 * 用于处理同一进程中的 ipc 通信
 */
export interface IIpcEventEmitter {
  listenerMap: IIpcEventEmitterListenerMap;
  eventEmitter: typeof Event;
  emit: (channel: string, message: IIpcMessage) => void;
  on: (channel: string, messageListener: IPortChannelCallback) => void;
  removeListener: (channel: string, handler?: Function) => void;
}
/**
 * 存储各个频道(事件)的回调函数
 */
export interface IIpcEventEmitterListenerMap {
  [channel: string]: IIpcEventEmitterListenerMapItem[];
}
/**
 * 各个频道(事件)的回调函数
 */
export interface IIpcEventEmitterListenerMapItem {
  /**
   * 开发者调用 on 时传入的回调函数
   */
  handler: Function;
  /**
   * 开发者调用 on 时真实绑定到 eventEmitter 上的回调函数，是对 handler 的一层封装
   */
  listener: (message: IIpcMessage) => void;
}
