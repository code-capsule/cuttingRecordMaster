import FFmpegTool from '@src/common/tools/ffmpegTool';
import { IGenerateThumbnailParams } from '@src/common/tools/ffmpegTool/tool/thumbnailTool';
import { ICustomResponseMetaData } from '@src/common/tools/ffmpegTool/types';
import { getLogger } from '@src/common/tools/log';
import { isEmpty, isNull, isUndefined } from 'lodash';
import md5 from 'md5';
const log = getLogger('clip.core.videoManager');

type ICustomMediaMaterialData = ICustomResponseMetaData & {
  cover?: string; //封面
  thumbnails?: string[]; //缩略图列表
};

class MediaManager {
  public ffmpegTool: typeof FFmpegTool;
  public cacheMediaMaterial: {
    [md5Hash: string]: ICustomMediaMaterialData;
  };
  constructor() {
    this.cacheMediaMaterial = {};
    this.ffmpegTool = window?.master?.tools?.ffmpegTool;
  }

  /**
   * @description 通过 md5Hash 获取缓存的素材信息
   * @param {string} md5Hash 视频素材唯一的hash
   * @returns {ICustomResourceMetaData}
   */
  private _getCache(md5Hash: string): ICustomMediaMaterialData | null {
    if (!md5Hash) return null;
    if (!this.cacheMediaMaterial?.[md5Hash]) return null;
    log.info('cached video material', this.cacheMediaMaterial?.[md5Hash]);
    return this.cacheMediaMaterial?.[md5Hash];
  }

  /**
   * @description 缓存素材信息
   */
  private _setCache(md5Hash: string, obj: ICustomMediaMaterialData) {
    if (!md5Hash) return;
    if (!this.cacheMediaMaterial?.[md5Hash]) {
      this.cacheMediaMaterial[md5Hash] = {
        ...obj,
      };
    }
  }
  /**
   * @description 生成多张帧缩略图
   * @param {IGenerateThumbnailParams} thumbnailParams
   */
  public async parseVideoAndGenerateFrames(thumbnailParams: IGenerateThumbnailParams): Promise<ICustomMediaMaterialData | null> {
    try {
      const metadata = await this?.ffmpegTool?.getMetaInfo(thumbnailParams?.filePath);
      const md5Hash = md5(JSON.stringify(metadata));
      const targetMaterial = this._getCache(md5Hash);
      if (isEmpty(targetMaterial) || isNull(targetMaterial) || isUndefined(targetMaterial)) {
        const timeMarks = Array.from({ length: metadata?.duration }, (val, idx) => idx + 1); // 默认每秒生成一张缩略图
        const thumbnails = await this?.ffmpegTool?.thumbnailTool.generateVideoFrames({
          filePath: thumbnailParams?.filePath,
          size: { width: 50, height: 50 },
          timeMarks,
        });
        const covers = await this?.ffmpegTool?.thumbnailTool?.generateVideoFrames({
          filePath: thumbnailParams?.filePath,
          size: { width: 320, height: 180 },
          timeMarks: [1],
        });
        const result = {
          ...metadata,
          cover: covers?.[0],
          thumbnails,
        };
        this._setCache(md5Hash, result);
        return result;
      } else return targetMaterial;
    } catch (err) {
      return null;
    }
  }
}

export default new MediaManager();
