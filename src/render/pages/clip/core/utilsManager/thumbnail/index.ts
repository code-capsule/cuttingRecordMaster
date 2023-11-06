import { THUMBNAIL_WIDTH } from '@src/render/pages/clip/constants';

interface IDemandParams {
  timeMarks: number[]; // 时间差值
  timeMarkViewDistanceWidth: number; // timeMarks 对应的范围区间的宽度
  totalThumbnailCount: number; // 资源视频总的缩略图个数
}
/**
 * @description 根据范围区间宽度计算需要展示多少张缩略图
 * @param {IDemandParams} params
 * @returns {number[]}
 */
const demandTimeMarksThumbnails = (params: IDemandParams): number[] => {
  const { timeMarkViewDistanceWidth, totalThumbnailCount } = params;
  // 1.计算出需要展示的缩略图张数
  const needThumbnailCount = Math.ceil(timeMarkViewDistanceWidth / THUMBNAIL_WIDTH);
  // 2.计算出系数
  let coefficient = 1;
  if (totalThumbnailCount < needThumbnailCount) coefficient = needThumbnailCount / totalThumbnailCount;
  else coefficient = totalThumbnailCount / needThumbnailCount;
  // 5.按系数返回缩略图
  const picIndexTimeMarks = [];
  let mark = 0;
  picIndexTimeMarks[0] = mark;
  for (let i = 1; i < needThumbnailCount; i++) {
    mark = mark + coefficient;
    picIndexTimeMarks[i] = mark;
  }
  return picIndexTimeMarks || [];
};

export default {
  demandTimeMarksThumbnails,
};
