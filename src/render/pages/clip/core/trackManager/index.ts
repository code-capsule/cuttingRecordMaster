import VideoTrackManager from './video';

export interface IReturnResponseTrackCell {
  /**
   * @description 最新的视频片段 cells 数据
   */
  newVideoCells?: MasterTrackCell.IVideoTrackCell[];
  /**
   * @description 最新的文字片段 cells 数据
   */
  newTextCells?: MasterTrackCell.ITextTrackCell[];
  /**
   * @description 最新的图片片段 cells 数据
   */
  newImageCells?: MasterTrackCell.IImageTrackCell[];
}

export default {
  video: new VideoTrackManager(),
};
