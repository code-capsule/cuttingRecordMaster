import path from 'path';
import { find } from 'lodash';
import { ICustomMediaMetadata } from './types';
import { IParserVideoMetadataStream, IParserAudioMetadataStream } from './types/parserMetadataType';
const ff = require('@codecapsule/fluent-ffmpeg');
const FfprobeData = ff.FfprobeData;
import StreamTool from './tool/streamTool';

class FFmpegTool {
  static Ffprobe = ff.ffprobe;
  static FFmpeg = (inputPath: string) => {
    return ff(inputPath).on('start', (cmd: string) => {
      console.log('[ffmpegTool] run ffmpeg', cmd);
    });
  };

  static streamTool = new StreamTool();

  /**
   * @description 初始化配置
   */
  static init(opts: { devAppPath: string; buildAppPath: string }) {
    const mode = process?.env?.mode || 'dev';
    const isWindows = process?.platform !== 'darwin';
    if (mode === 'dev') {
      ff.setFfmpegPath(this.parseDevelopmentPath(opts?.devAppPath, 'ffmpeg', isWindows));
      ff.setFfprobePath(this.parseDevelopmentPath(opts?.devAppPath, 'ffprobe', isWindows));
    } else {
      ff.setFfmpegPath(this.parseProductionPath(opts?.buildAppPath, 'ffmpeg', isWindows));
      ff.setFfprobePath(this.parseProductionPath(opts?.buildAppPath, 'ffprobe', isWindows));
    }
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

  async getMetaInfo(inputPath: string): Promise<ICustomMediaMetadata> {
    return new Promise((resolve, reject) => {
      FFmpegTool.Ffprobe(inputPath, (e: Error, metadata: typeof FfprobeData) => {
        if (e) {
          reject(e);
          return;
        }
        const { streams } = metadata;
        const videoInfo = find(streams, { codec_type: 'video' }) as IParserVideoMetadataStream;
        const audioInfo = find(streams, { codec_type: 'audio' }) as IParserAudioMetadataStream;
        resolve({
          videoInfo,
          audioInfo,
        } as ICustomMediaMetadata);
      });
    });
  }
}
export default FFmpegTool;
