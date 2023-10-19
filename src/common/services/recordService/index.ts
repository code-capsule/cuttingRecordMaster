import { IRecordService, IRecordServiceInitializeParams } from './typings';
import { IStartRecordOptions, IStartRecordResult, IStopRecordResult, IPauseRecordResult, IResumeRecordResult } from './typings/recorder';
import RecordInteract from './recordInteract';
import { IRecordEvent } from './typings/recordEvent';
import RtcRecorder from './rtcRecorder';
import RecordPluginManager from './recordPluginManager';

class RecorderService implements IRecordService {
  private recordInteract?: RecordInteract;
  public recordEvent?: IRecordEvent;

  public initialize(params: IRecordServiceInitializeParams): void {
    const { recordEvent } = params;
    const recorder = new RtcRecorder();
    const recordPluginManager = new RecordPluginManager(this);
    this.recordInteract = new RecordInteract({
      recordEvent,
      recorder,
      recordPluginManager,
    });
  }

  public async startRecord(options: IStartRecordOptions): Promise<IStartRecordResult>{
    if (!this.recordInteract) {
      throw new Error('recordInteract is not ready');
    }
    return this.recordInteract.startRecord(options);
  }

  public async stopRecord(): Promise<IStopRecordResult> {
    if (!this.recordInteract) {
      throw new Error('recordInteract is not ready');
    }
    return this.recordInteract.stopRecord();
  }

  public async pauseRecord(): Promise<IPauseRecordResult> {
    if (!this.recordInteract) {
      throw new Error('recordInteract is not ready');
    }
    return this.recordInteract.pauseRecord();
  }

  public async resumeRecord(): Promise<IResumeRecordResult> {
    if (!this.recordInteract) {
      throw new Error('recordInteract is not ready');
    }
    return this.recordInteract.resumeRecord();
  }
}

export default RecorderService;
