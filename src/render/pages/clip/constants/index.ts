/**
 * @description 时间刻度尺
 */
export const TRACK_UNIT_PX = 160; // 一个大刻度之间的物理宽度
export const TRACK_UNIT_GRID_NUMBER = 10; // 每个大刻度之间的小格子数量
export const TRACK_UNIT_TIME_GEARS = [120, 90, 60, 50, 40, 30, 20, 10, 5, 2, 1]; // 挡位缩放时对应的时间刻度
export const TRACK_UNIT_TIME = 5; // 默认30s为一个大刻度，换言之，UI 上展示是 00:00-00:30、00:30-01:00

/**
 * @description 封面图
 */
export const THUMBNAIL_WIDTH = 40;
export const THUMBNAIL_HEIGHT = 40;
export const THUMBNAIL_GENERATE_SPLIT_COUNT = 5; // 间隔5秒生成一张缩略图
