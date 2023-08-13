import { IRecordInteract, IRecordInteractInitProps } from '../typings/recordInteract';
import { IRecorder, IStartRecordOptions, IRecordCallResult } from '../typings/recorder';
import { IRecordPluginManager } from '../typings/recordPluginManager';
import { IRecordEvent } from '../typings/recordEvent';
import { checkCodeSuccess } from './utils';
import { RecordEventChannel } from '../typings';

class RecordInteract implements IRecordInteract {
  private recorder: IRecorder;
  private recordPluginManager: IRecordPluginManager;
  private recordEvent: IRecordEvent;

  constructor(props: IRecordInteractInitProps) {
    this.recorder = props.recorder;
    this.recordPluginManager = props.recordPluginManager;
    this.recordEvent = props.recordEvent;
  }

  public startRecord = async (options: IStartRecordOptions): Promise<IRecordCallResult> => {
    try {
      const isStartRecord = await this.recordPluginManager.executePreStartRecordHook({ operationType: 'start' });
      if (!isStartRecord) {
        return { code: -1, message: 'start record failed' };
      }
      const res = await this.recorder.startRecord(options);
      if (checkCodeSuccess(res.code)) {
        console.log('start record success...');
        this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'recording' });
      } else {
        this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'unStart' });
      }
      this.recordPluginManager.executePostStartRecordHook(res);
      return res;
    } catch (error) {
      this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'unStart' });
      this.recordPluginManager.executePostStartRecordHook({
        code: -1,
        message: (error as Error).message,
      });
      console.error('start record error...', error);
      throw error;
    }
  };

  public pauseRecord = async (): Promise<IRecordCallResult> => {
    try {
      const res = await this.recorder.pauseRecord();
      if (checkCodeSuccess(res.code)) {
        this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'pause' });
      }
      this.recordPluginManager.executePostPauseRecordHook(res);
      return res;
    } catch (error) {
      this.recordPluginManager.executePostPauseRecordHook({
        code: -1,
        message: (error as Error).message,
      });
      console.error('pause record error...', error);
      throw error;
    }
  };

  public stopRecord = async (): Promise<IRecordCallResult> => {
    try {
      const res = await this.recorder.stopRecord();
      if (checkCodeSuccess(res.code)) {
        this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'unStart' });
      }
      this.recordPluginManager.executePostStopRecordHook(res);
      return res;
    } catch (error) {
      this.recordPluginManager.executePostStopRecordHook({
        code: -1,
        message: (error as Error).message,
      });
      console.error('stop record error...', error);
      throw error;
    }
  };

  public resumeRecord = async (): Promise<IRecordCallResult> => {
    try {
      const isStartRecord = await this.recordPluginManager.executePreStartRecordHook({ operationType: 'resume' });
      if (!isStartRecord) {
        return { code: -1, message: 'resume record failed' };
      }
      const res = await this.recorder.resumeRecord();
      if (checkCodeSuccess(res.code)) {
        this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'recording'});
      } else {
        this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'pause' });
      }
      this.recordPluginManager.executePostResumeRecordHook(res);
      return res;
    } catch (error) {
      this.recordEvent.send(RecordEventChannel.RecordStatusChange, { status: 'pause' });
      this.recordPluginManager.executePostResumeRecordHook({
        code: -1,
        message: (error as Error).message,
      });
      console.error('resume record error...', error);
      throw error;
    }
  };
}
export default RecordInteract;
