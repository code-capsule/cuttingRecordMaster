import path from 'path';
import { find } from 'lodash';
import { ICustomMediaMetadata } from './types';
import { IParserVideoMetadataStream, IParserAudioMetadataStream } from './types/parserMetadataType';
import { getLogger } from '@common/tools/log';
import ff, { FfprobeData } from 'fluent-ffmpeg';
const logger = getLogger('ffmpegTool');

class FFmpegTool {
  static Ffprobe = ff.ffprobe;
  static FFmpeg = (inputPath: string) => {
    return ff(inputPath).on('start', (cmd: string) => {
      logger.info('[ffmpegTool] run ffmpeg', cmd);
    });
  };

  /**
   * @description 初始化配置
   */
  static init(opts: { devAppPath: string; buildAppPath: string }) {
    const mode = process?.env?.mode || 'dev';
    if (mode === 'dev') {
      ff.setFfmpegPath(this.parseDevelopmentPath(opts?.devAppPath, 'ffmpeg.exe'));
      ff.setFfprobePath(this.parseDevelopmentPath(opts?.devAppPath, 'ffprobe.exe'));
    } else {
      ff.setFfmpegPath(this.parseProductionPath(opts?.buildAppPath, 'ffmpeg.exe'));
      ff.setFfprobePath(this.parseProductionPath(opts?.buildAppPath, 'ffprobe.exe'));
    }
  }

  private static parseDevelopmentPath(appPath: string, exePath: string) {
    const devPath = path.join(appPath, '../', `./src/common/tools/ffmpegTool/${exePath}`);
    logger.info('[ffmpegTool] devPath: ', devPath);
    return devPath;
  }

  private static parseProductionPath(appPath: string, exePath: string) {
    return '';
  }

  async getMetaInfo(inputPath: string): Promise<ICustomMediaMetadata> {
    return new Promise((resolve, reject) => {
      FFmpegTool.Ffprobe(inputPath, (e: Error, metadata: FfprobeData) => {
        if (e) {
          reject(e);
          return;
        }
        logger.info('[ffmpegTool] get metadata info');
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
