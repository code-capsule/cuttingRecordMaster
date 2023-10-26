declare namespace MasterTrackType {
  interface ITrackInfo {
    boxWidth?: number; // 时间轴视口宽度
    trackWidth?: number; // 轨道总宽度
    totalDuration?: number; // 总时长，在该项目中，总时长等于录制的视频素材时长
    scrollLeft?: number; // 轨道向左滚动距离，目的是为了正确计算滚动之后，通过定位时间线推算出时间
    unitPX?: number; // 时间刻度尺的单位格子宽度
    unitTime?: number; // 时间刻度尺的单位时间
    anchorTime?: number; // 时间线
    timeScaleGears?: number; // 缩放倍数，范围在 [timeScaleMinGears, timeScaleMaxGears]
    timeScaleMinGears?: number; // 最小挡位
    timeScaleMaxGears?: number; // 最大挡位
  }
}
