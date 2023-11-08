import md5 from 'md5';
import FFmpegTool from '..';
import fileService from '@common/tools/fileTool';
import { getLogger } from '../../log';
const log = getLogger('tools.ffmpeg.thumbnailTool');

class SoundTool {
  private soundWavPath = '';

  constructor() {
    // C:\Users\user\AppData\Roaming\CuttingRecordMaster\{user.uid}\static\{projectId}\sounds\{thumbnailImageHash}
    const appArchivePath = FFmpegTool?.master?.appArchivePath;
    const stores = FFmpegTool?.master?.stores;
    const userUid = stores?.localStore?.user?.getUserInfo?.()?.uid;
    const projectId = stores?.localStore?.project?.getProjectInfo?.()?.id;
    this.soundWavPath = `${appArchivePath}\\${userUid}\\static\\${projectId}\\sounds`;
  }

  /**
   * @description 通过解析PCM数据，生成 wav 文件，再通过 wavesurfer.js 展示音波图
   * @returns {Promise<string>} 生成好的 wav 文件地址
   */
  async generateSoundAudioPCM(filePath: string, filename: string): Promise<string> {
    if (!filePath) {
      log.error('generate sound audio is illegal!');
      return '';
    } else {
      const soundWavHash = md5(JSON.stringify({ filePath }));
      const soundWavFolderPath = `${this.soundWavPath}\\${soundWavHash}`;

      try {
        await fileService.mkdirDir(soundWavFolderPath);
        const task: Promise<string> = new Promise((resolve, reject) => {
          FFmpegTool.FFmpeg(filePath)
            .audioCodec('pcm_s16le')
            .toFormat('wav')
            .on('end', () => resolve(`${soundWavFolderPath}\\${filename}.wav`))
            .on('error', (e: Error) => reject(e))
            .save(`${soundWavFolderPath}\\${filename}.wav`);
        });
        const url = await task;
        return url;
      } catch (err) {
        return '';
      }
    }
  }
}

export default SoundTool;
