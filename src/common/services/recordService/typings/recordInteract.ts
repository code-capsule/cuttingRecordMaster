import { IRecorder } from './recorder';
import { IRecordEvent } from './recordEvent';
import { IRecordPluginManager } from './recordPluginManager';

export interface IRecordInteract extends IRecorder {}

export interface IRecordInteractInitProps {
  recorder: IRecorder;
  recordPluginManager: IRecordPluginManager;
  recordEvent: IRecordEvent;
}