import path from 'path';
import fs from 'fs';
import FFmpegTool from '..';
import FileTool from '@common/tools/fileTool';
import { generateUUid } from '@common/utils/uuid';

class ConcatTool {
  private concatPath = '';

  constructor() {
    const appArchivePath = FFmpegTool?.master?.appArchivePath || '';
    this.concatPath = `${appArchivePath}/concat`;
  }

  /**
   * 写入 blob 到某个媒体文件
   */
  async mergeToMp4(filePaths: string[]): Promise<string> {
    return new Promise((res, rej) => {
      const filepath = path.join(this.concatPath, `${generateUUid()}.mp4`);
      const { inputPath, concatOption } = this.getInputFileConcatOption(filePaths);
      const outputOptions: string[] = ['-c copy'];
      FFmpegTool.FFmpeg(inputPath)
        .inputOptions(concatOption)
        .outputOptions(outputOptions)
        .on('error', function (err: any) {
          console.log('concat failed: ' + err.message);
          rej('');
        })
        .on('end', function () {
          console.log('concat finished !');
          res(filepath);
        })
        .save(filepath);
    });
  }

  getInputFileConcatOption(filePaths: string[]) {
    const filelines = filePaths.map((filepath) => {
      return `file '${filepath}'`;
    });
    const concatFileContent = filelines.join('\n').replaceAll('\\', '\\\\');
    const tempFile: string = path.join(this.concatPath, `${generateUUid()}.txt`);
    fs.writeFileSync(tempFile, concatFileContent, { encoding: 'utf-8' });
    return {
      inputPath: tempFile,
      concatOption: ['-f concat', '-safe 0'],
    };
  }
}

export default ConcatTool;