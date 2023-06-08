import path from 'path';
import { find } from 'lodash';
import ff from 'fluent-ffmpeg';

class FFmpegTool {
  static Ffprobe = ff.ffprobe;
  static FFmpeg = (inputPath: string) => {
    return ff(inputPath).on('start', (cmd: string) => {
      console.log('[ffmpegTool] run ffmpeg', cmd);
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
    console.log('[ffmpegTool] devPath: ', devPath);
    return devPath;
  }

  private static parseProductionPath(appPath: string, exePath: string) {
    return '';
  }

  async getMetaInfo(inputPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      FFmpegTool.Ffprobe(inputPath, (e: Error, metadata: any) => {
        if (e) {
          reject(e);
          return;
        }
        console.log('[ffmpegTool] get metadata info');
        const { streams } = metadata;
        const videoInfo = find(streams, { codec_type: 'video' }) as any;
        const audioInfo = find(streams, { codec_type: 'audio' }) as any;
        resolve({
          videoInfo,
          audioInfo,
        } as any);
      });
    });
  }
}
export default FFmpegTool;
