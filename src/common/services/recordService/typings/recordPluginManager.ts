import { IRecordService } from './index';
import { IRecordCallResult } from './recorder';

export interface IPluginItemBase<IPluginContext> {
  name: string;
  apply: (pluginApi: IPluginContext) => void;
}

export interface IPluginCore<IPluginItemBase, IPluginContext> {}

export interface IRecordPluginManager extends IPluginCore<ICapsulePluginItem, IRecordService> {
  executePreStartRecordHook: (props: IPreStartRecordHookArgs) => Promise<boolean>;
  executePostStartRecordHook: (startRecordResult: IRecordCallResult) => Promise<void>;
  executePostPauseRecordHook: (pauseRecordResult: IRecordCallResult) => Promise<void>;
  executePostStopRecordHook: (stopRecordResult: IRecordCallResult) => Promise<void>;
  executePostResumeRecordHook: (resumeRecordResult: IRecordCallResult) => Promise<void>;
}

export interface IPreStartRecordHookArgs {
  operationType: 'start' | 'resume';
}

export interface ICapsulePluginItem extends IPluginItemBase<IRecordService> {
  hooks?: ICapsuleRecordHook;
}

export interface ICapsuleRecordHook {
  [ERecordPluginHook.preStartRecord]?: (recordService: IRecordService, args: IPreStartRecordHookArgs) => Promise<boolean>;
  [ERecordPluginHook.postStartRecord]?: (recordService: IRecordService, startRecordResult: IRecordCallResult) => Promise<void>;
  [ERecordPluginHook.postPauseRecord]?: (recordService: IRecordService, pauseRecordResult: IRecordCallResult) => Promise<void>;
  [ERecordPluginHook.postStopRecord]?: (recordService: IRecordService, stopRecordResult: IRecordCallResult) => Promise<void>;
  [ERecordPluginHook.postResumeRecord]?: (recordService: IRecordService, resumeRecordResult: IRecordCallResult) => Promise<void>;
}

export enum ERecordPluginHook {
  preStartRecord = 'preStartRecord',
  postStartRecord = 'postStartRecord',
  postPauseRecord = 'postPauseRecord',
  postStopRecord = 'postStopRecord',
  postResumeRecord = 'postResumeRecord',
}

export interface RecordPluginHooksParams {
  hook: ERecordPluginHook;
  data: IRecordCallResult;
}