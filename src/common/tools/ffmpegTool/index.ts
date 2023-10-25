import path from 'path';
import { find, isEmpty } from 'lodash';
import { ICustomResponseMetaData } from './types';
import { IParserVideoMetadataStream, IParserAudioMetadataStream } from './types/parserMetadataType';
const ff = require('@codecapsule/fluent-ffmpeg');
const FfprobeData = ff.FfprobeData;
import StreamTool from './tool/streamTool';
import ThumbnailTool from './tool/thumbnailTool';
import { Master } from '@src/typings/browser';

class FFmpegTool {
  static Ffprobe = ff.ffprobe;
  static FFmpeg = (inputPath: string) => {
    return ff(inputPath).on('start', (cmd: string) => {
      console.log('[ffmpegTool] run cmd: ', cmd);
    });
  };

  static master: Master;
  static streamTool: StreamTool;
  static thumbnailTool: ThumbnailTool;

  /**
   * @description 初始化配置
   */
  static config(opts: { devPath: string; buildPath: string; master: Master }) {
    const mode = process?.env?.mode || 'dev';
    const isWindows = process?.platform !== 'darwin';
    if (mode === 'dev') {
      ff.setFfmpegPath(this.parseDevelopmentPath(opts?.devPath, 'ffmpeg', isWindows));
      ff.setFfprobePath(this.parseDevelopmentPath(opts?.devPath, 'ffprobe', isWindows));
    } else {
      ff.setFfmpegPath(this.parseProductionPath(opts?.buildPath, 'ffmpeg', isWindows));
      ff.setFfprobePath(this.parseProductionPath(opts?.buildPath, 'ffprobe', isWindows));
    }
    this.master = opts?.master;
    this.streamTool = new StreamTool();
    this.thumbnailTool = new ThumbnailTool();
  }

  private static parseDevelopmentPath(appPath: string, exePath: string, isWindows: boolean) {
    if (isWindows) {
      const devPath = path.join(appPath, '../', `./src/common/tools/ffmpegTool/ffmpeg/windows/${exePath}.exe`);
      return devPath;
    } else {
      const devPath = path.join(appPath, '../', `./src/common/tools/ffmpegTool/ffmpeg/mac/${exePath}`);
      return devPath;
    }
  }

  private static parseProductionPath(appPath: string, exePath: string, isWindows: boolean) {
    return '';
  }

  static async getMetaInfo(inputPath: string): Promise<ICustomResponseMetaData> {
    return new Promise((resolve, reject) => {
      FFmpegTool.Ffprobe(inputPath, (e: Error, metadata: typeof FfprobeData) => {
        if (e) {
          reject(e);
          return;
        }
        const { format, streams } = metadata;
        const videoInfo = find(streams, { codec_type: 'video' }) as IParserVideoMetadataStream;
        const audioInfo = find(streams, { codec_type: 'audio' }) as IParserAudioMetadataStream;
        let resolution = '1920x1080';
        if (!isEmpty(videoInfo)) resolution = `${videoInfo?.width}x${videoInfo?.height}`;
        resolve({
          resolution,
          url: inputPath,
          name: path.basename(format?.filename || ''),
          startTime: videoInfo?.start_time || 0,
          duration: format?.duration || 0,
          size: format?.size,
          videoExpandedInfo: {
            codec_name: videoInfo?.codec_name,
            avg_frame_rate: videoInfo?.avg_frame_rate,
          },
          audioExpandedInfo: {
            codec_name: audioInfo?.codec_name,
            sample_rate: audioInfo?.sample_rate,
          },
        } as ICustomResponseMetaData);
      });
    });
  }
}
export default FFmpegTool;
