import Rtc from 'recordrtc';
import { IRecorder, IStartRecordOptions, IStartRecordResult, IStopRecordResult, IPauseRecordResult, IResumeRecordResult } from '../typings/recorder';
import FFmpegTool from '@src/common/tools/ffmpegTool';
import { getLogger } from '@src/common/tools/log';
const log = getLogger('RtcRecorder');

class RtcRecorder implements IRecorder {
  private rtc?: Rtc;
  private videoStream?: MediaStream;
  private audioStream?: MediaStream;
  private systemAudioStream?: MediaStream;
  private recordVideoPath?: string;
  public async startRecord(options: IStartRecordOptions): Promise<IStartRecordResult> {
    console.log('startRecord');
    return { code: 0 };
  }

  public async stopRecord(): Promise<IStopRecordResult> {
    console.log('stopRecord');
    return { code: 0 };
  }

  public async pauseRecord(): Promise<IPauseRecordResult> {
    console.log('pauseRecord');
    return { code: 0 };
  }

  public async resumeRecord(): Promise<IResumeRecordResult> {
    console.log('resumeRecord');
    return { code: 0 };
  }

  private async initRtc() {
    if (!this.videoStream) {
      log.error('videoStream is not ready');
      return;
    }
    const rtc = new Rtc(this.videoStream, {
      type: 'video',
      mimeType: 'video/webm;codecs=h264',
      timeSlice: 30 * 1000,
      ondataavailable: (blob: Blob) => {
        this.handleDataAvailable(blob);
      },
    });

    this.rtc = rtc;

    log.info('init record rtc success');
  }

  private async handleDataAvailable(blob: Blob) {
    log.info('handleDataAvailable, blob size is: ', blob.size);
    const videoPath = await FFmpegTool.streamTool.writeStreamToMediaFile(blob, this.recordVideoPath);
    this.recordVideoPath = videoPath;
  }
}

export default RtcRecorder;
