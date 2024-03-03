import Rtc, { State } from 'recordrtc';
import { IRecorder, IStartRecordOptions, IStartRecordResult, IStopRecordResult, IPauseRecordResult, IResumeRecordResult } from '../typings/recorder';
import FFmpegTool from '@src/common/tools/ffmpegTool';
import { RECORD_AUDIO_CONFIG, RECORD_VIDEO_CONFIG } from '../constants';
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
    const initVideoStreamRes = await this.initVideoStream(options);
    this.rtc?.startRecording();
    this.handleStateChanged();
    return initVideoStreamRes;
  }

  public async stopRecord(): Promise<IStopRecordResult> {
    console.log('stopRecord');
    this.rtc?.stopRecording();
    const mp4Path = await FFmpegTool.streamTool.transformVideoMp4({ inputPath: this.recordVideoPath || '' });
    return { code: 0, data: { path: mp4Path } };
  }

  public async pauseRecord(): Promise<IPauseRecordResult> {
    console.log('pauseRecord');
    if (!this.rtc) {
      log.error('rtc is not ready');
      return { code: -1 };
    }

    this.rtc?.pauseRecording();
    return { code: 0 };
  }

  public async resumeRecord(): Promise<IResumeRecordResult> {
    console.log('resumeRecord');
    if (!this.rtc) {
      log.error('rtc is not ready');
      return { code: -1 };
    }

    this.rtc?.resumeRecording();
    return { code: 0 };
  }

  private async initVideoStream(options: IStartRecordOptions): Promise<IStartRecordResult> {
    const { audio, video } = options;
    const { deviceId } = video;

    if (!deviceId) {
      log.error('video deviceId is not ready');
      return { code: -1 };
    }

    const constraints: MediaStreamConstraints = {
      video: {
        ...RECORD_VIDEO_CONFIG,
        ...video,
      },
      audio: audio && audio.hasSystemAudio ? {
        ...RECORD_AUDIO_CONFIG,
        ...audio,
      } : false,
    };

    log.info('init video stream with constraints: ', constraints);

    const videoStream = await navigator.mediaDevices.getUserMedia(constraints);

    this.videoStream = videoStream;

    log.info('init video stream success');

    const initRtcRes = await this.initRtc();

    return initRtcRes;
  };

  private async initRtc(): Promise<IStartRecordResult> {
    if (!this.videoStream) {
      log.error('video stream is not ready');
      return { code: -1 };
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
    return { code: 0 };
  }

  private async handleDataAvailable(blob: Blob) {
    log.info('handleDataAvailable, blob size is: ', blob.size);
    const videoPath = await FFmpegTool.streamTool.writeStreamToMediaFile(blob, this.recordVideoPath);
    this.recordVideoPath = videoPath;
  }

  private handleStateChanged() {
    // @ts-ignore
    this.rtc?.onStateChanged((state: State) => {
      console.log('state changed: ', state);
    });
  }
}

export default RtcRecorder;
