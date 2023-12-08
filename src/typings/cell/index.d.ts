declare namespace MasterTrackCell {
  interface IBaseTrack<TrackCell> {
    /**
     * @description 轨道唯一标识
     */
    id?: string;
    /**
     * @description 轨道类型
     */
    type: 'video' | 'text' | 'image';
    /**
     * @description 片段集
     */
    cells?: TrackCell[];
  }

  /**
   * @description 基础片段
   */
  interface InitializeTrackCell {
    /**
     * @description 片段id
     */
    id?: string;
    /**
     * @description 类型
     */
    type: 'video' | 'text' | 'image';
    /**
     * @description 片段id映射的源素材id
     */
    materialId?: string;
    /**
     * @description 相对于轨道的播放时间
     */
    trackStartTime?: number;
    /**
     * @description 层级
     */
    zIndex?: number;
  }
  type IVideoTrackCell = InitializeTrackCell;
  type ITextTrackCell = InitializeTrackCell;
  type IImageTrackCell = InitializeTrackCell;

  interface IProjectTrack {
    /**
     * @description 视频轨
     */
    videoTrack?: IBaseTrack<IVideoTrackCell>;
    /**
     * @description 文本轨
     */
    textTrack?: IBaseTrack<ITextTrackCell>;
    /**
     * @description 图片贴纸轨
     */
    imageTrack?: IBaseTrack<IImageTrackCell>;
  }
}
