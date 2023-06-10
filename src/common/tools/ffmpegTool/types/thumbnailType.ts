/**
 * @description 生成缩略图
 */
export interface IThumbnailItem {
  /**
   * @description 视频资源路径
   */
  inputPath: string;
  /**
   * @description 获取缩略图的时间点 （假设时间点时5，则表示取第5秒的缩略图）
   */
  timeMarks: number[];
  /**
   * @description 缩略图大小（例如 160x90）
   */
  size?: string;
  /**
   * @description 裁剪部位，格式为 width:height:x:y
   * @example 160:90:0:0
   */
  crop?: string;
}
