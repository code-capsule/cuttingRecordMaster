export interface IRecordEvent {
  on: (channel: string, listener: IEventListenerCallback, once?: boolean) => void;
  send: (channel: string, ...args: any[]) => void;
  once: (channel: string, listener: IEventListenerCallback) => void;
  off: (channel: string, listener: IEventListenerCallback) => void;
}

export interface IEvent {
  [key: string]: IEventListenerCallback[];
}

export type IEventListenerCallback = (...args: any[]) => void;
