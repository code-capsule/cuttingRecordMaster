import md5 from 'md5';
import async from 'async';
import FFmpegTool from '..';
import fileService from '@common/tools/fileTool';
import { getLogger } from '../../log';
import { MASTER_PROTOCOL } from '@main/setup/protocol';
const log = getLogger('tools.ffmpeg.thumbnailTool');

export interface IGenerateThumbnailParams {
  filePath: string; // 视频地址
  timeMarks?: number[]; // 视频时间点
  size?: {
    height: number;
    width: number;
  };
}

class ThumbnailTool {
  private thumbnailSavePath = '';
  static thumbnailQueue = async.queue(this.generateFrameTask.bind(this), 10);

  constructor() {
    // C:\Users\user\AppData\Roaming\CuttingRecordMaster\{user.uid}\static\{projectId}\thumbnails\{thumbnailImageHash}
    const appArchivePath = FFmpegTool?.master?.appArchivePath;
    const stores = FFmpegTool?.master?.stores;
    const userUid = stores?.localStore?.user?.getUserInfo?.()?.uid;
    const projectId = stores?.localStore?.project?.getProjectInfo?.()?.id;
    this.thumbnailSavePath = `${appArchivePath}\\${userUid}\\static\\${projectId}\\thumbnails`;
  }

  private static async generateFrameTask({ size, filePath, timeMark, thumbnailFolderPath }: any, callback?: (err?: any, res?: string) => void) {
    try {
      const { width, height } = size;
      const saveThumbnailUrl = `${thumbnailFolderPath}\\${timeMark}.png`;
      const outputOptions = [`-vf scale=${width}:${height}`, '-vframes 1'];

      const task: Promise<string> = new Promise((resolve, reject) => {
        FFmpegTool.FFmpeg(filePath)
          .inputOptions(['-ss', timeMark])
          .outputOptions(outputOptions)
          .save(saveThumbnailUrl)
          .on('end', () => resolve(`${MASTER_PROTOCOL}://${saveThumbnailUrl}`))
          .on('error', (e: Error) => reject(e));
      });
      const url = await task;
      callback?.(null, url);
    } catch (err) {
      log.error(`generate task error is ${err}`);
      callback?.(err);
    }
  }

  /**
   * @description 批量生成缩略图
   * @param {IGenerateThumbnailParams} thumbnailParams 生成缩略图的参数
   * @returns {Promise<string[]>} 生成好的缩略图地址
   */
  async generateVideoFrames({ filePath, timeMarks = [], size }: IGenerateThumbnailParams): Promise<string[]> {
    if (!filePath || !size?.height || !size?.width) {
      log.error('generate video frame params is illegal!');
      return [];
    } else {
      const thumbnailImageHash = md5(JSON.stringify({ filePath, size }));
      const thumbnailFolderPath = `${this.thumbnailSavePath}\\${thumbnailImageHash}`;
      try {
        await fileService.mkdirDir(thumbnailFolderPath);
        const tasks = timeMarks?.map((timeMark: number) => {
          return ThumbnailTool.thumbnailQueue.pushAsync({
            size,
            filePath,
            timeMark,
            thumbnailFolderPath,
          });
        });
        await Promise.all(tasks);
        const urls = timeMarks?.map((timeMark) => {
          return `${MASTER_PROTOCOL}://${thumbnailFolderPath}\\${timeMark}.png`;
        });
        return urls;
      } catch (err) {
        log.error(`create ${thumbnailFolderPath} folder fail!, error is ${err}`);
        return [];
      }
    }
  }
}

export default ThumbnailTool;
