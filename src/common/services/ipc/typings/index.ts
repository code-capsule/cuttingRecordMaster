export * from './channel';
export * from './base';
export * from './events';

import { IIpcMessageCtx } from './channel';
import { IIpcEventEmitter } from './events';

export enum EIpcNamespace {
  Main = 'Main',
  Render = 'Render',
}

/**
 * ipc 的基类
 */
export interface IBaseIpc {
  /**
   * 命名空间
   */
  namespace: EIpcNamespace;
  /**
   * 当前进程的唯一标识
   */
  processKey: TProcessKey;
  /**
   * 日志
   */
  logger: IIpcLogger;
  /**
   * 事件处理对象，用于处理进程内部自己的消息
   */
  eventEmitter: IIpcEventEmitter;
  /**
   * 各个进程的 port 的集合
   */
  processMessagePortMap: IProcessMessagePortMap;
  /**
   * 每个 port 接收到的事件集合
   */
  portChannelMap: IPortChannelMap;
  /**
   * 发送消息(触发事件)
   */
  send: (channel: string, args?: any) => void;
   /**
    * 请求消息
    */
  request: (channel: string, timeout?: number | 'infinite', args?: any) => Promise<any>;
   /**
    * 绑定事件
    */
  on: (channel: string, handler: TPortChannelHandler | IPortChannelCallback, once?: boolean) => void;
  /**
   * 绑定一次事件
   */
  once: (channel: string, handler: TPortChannelHandler | IPortChannelCallback) => void;
   /**
    * 解除绑定事件
    */
  off: (channel: string, handler?: Function) => void;
   /**
    * 解除绑定事件
    */
  removeListener: (channel: string, handler?: Function) => void;
}

export interface IBaseIpcProps {
  /**
   * 当前进程的唯一标识
   */
  processKey: TProcessKey;
  /**
   * 自定义日志
   */
  logger?: TIpcLoggerProps;
  /**
   * 是否打印日志
   */
  hasLog?: boolean;
}

export type TIpcLoggerProps = Partial<IIpcLogger>;

export interface IIpcLogger {
  /**
   * 普通日志
   */
  info: (...args: any[]) => void;
  /**
   * 报错日志
   */
  error: (...args: any[]) => void;
}

export type TProcessKey = string;
export type TMessagePort = MessagePort | Electron.MessagePortMain;

export interface IProcessMessagePortMap {
  [processKey: TProcessKey]: IProcessMessagePortMapItem;
}

export interface IProcessMessagePortMapItem {
  processKey: TProcessKey;
  messagePort: TMessagePort;
  webContents?: Electron.WebContents;
}

export interface IPortChannelMap {
  [channel: string]: IPortChannel;
}

export interface IPortChannel {
  callbacks: IPortChannelCallback[];
}

export interface IPortChannelCallback {
  /**
   * 事件回调函数
   */
  handler: TPortChannelHandler;
  /**
   * 此次消息的 id
   */
  reqId?: string;
  /**
  * 是否单次
  */
  once?: boolean;
}

export type TPortChannelHandler = (ctx: IIpcMessageCtx, body: any) => void;

export interface IMainIpc extends IBaseIpc {}

export interface IRenderIpc extends IBaseIpc {}