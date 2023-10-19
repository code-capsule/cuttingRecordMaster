import { IRecorder } from './recorder';
import { IRecordEvent } from './recordEvent';

export interface IRecordService extends IRecorder {
  recordEvent?: IRecordEvent;
}

export interface IRecordServiceInitializeParams {
  recordEvent: IRecordEvent;
}

export enum RecordEventChannel {
  RecordStatusChange = 'RecordStatusChange',
  RecordPluginHooks = 'RecordPluginHooks',
}

export * from './recorder';
