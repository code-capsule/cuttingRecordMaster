export interface IRecorder {
  startRecord(options: IStartRecordOptions): Promise<IStartRecordResult>;
  stopRecord(): Promise<IStopRecordResult>;
  pauseRecord(): Promise<IPauseRecordResult>;
  resumeRecord(): Promise<IResumeRecordResult>;
}

export interface IRecordCallResult {
  code: number;
  data?: any;
  message?: string;
}

export interface IStartRecordOptions {
  audio: IRecordAudioOptions | false;
  video: IRecordVideoOptions;
}

export interface IRecordAudioOptions {
  deviceId: string;
  sampleRate?: number;
  channelCount?: number;
}

export interface IRecordVideoOptions {
  sourceId: string;
  frameRate?: number;
  width?: number;
  height?: number;
}

export interface IStartRecordResult extends IRecordCallResult {
  data?: IStartRecordData;
}

export interface IStopRecordResult extends IRecordCallResult {
  data?: IStopRecordData;
}

export interface IPauseRecordResult extends IRecordCallResult {}

export interface IResumeRecordResult extends IRecordCallResult {}

export interface IStartRecordData {
  /**
   * 录制的视频文件的路径
   */
  path: string;
}
export interface IStopRecordData {
  /**
   * 录制的视频文件的路径
   */
  path: string;
}