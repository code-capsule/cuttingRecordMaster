import path from 'path';
import FFmpegTool from '..';
import FileTool from '@common/tools/fileTool';
import { generateUUid } from '@common/utils/uuid';

class StreamTool {
  private streamPath = '';

  constructor() {
    const appArchivePath = FFmpegTool?.master?.appArchivePath || '';
    this.streamPath = `${appArchivePath}\\originMedia`;
  }

  /**
   * 写入 blob 到某个媒体文件
   */
  async writeStreamToMediaFile(blob: Blob, defaultOutPutPath?: string): Promise<string> {
    const chunk = await blob.arrayBuffer();
    return new Promise(async (res, rej) => {
      const buffer = Buffer.from(chunk);
      // 判断文件夹是否存在
      await FileTool.mkdirDir(this.streamPath);
      // 判断是否传入了文件路径，如果传入了则使用传入的文件路径，如果没有传入则使用默认的文件路径
      const outPutPath = defaultOutPutPath ? defaultOutPutPath : path.join(this.streamPath, `${generateUUid()}.webm`);
      console.log(`blob writing to media file, the outPutPath is ${outPutPath ? outPutPath : 'not exists'}`);
      // 判断文件是否存在，不存在则创建并返回，存在则直接返回
      try {
        const writeStream = FileTool.ensureWriteStream(outPutPath);
        writeStream?.write(buffer);
        writeStream?.on('finish', () => {
          console.log('write stream is finish!');
          res(outPutPath);
        });
        writeStream?.end();
      } catch (error) {
        rej(error);
      }
    });
  }
}

export default StreamTool;