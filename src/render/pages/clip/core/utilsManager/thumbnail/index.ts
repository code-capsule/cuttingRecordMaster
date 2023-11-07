import { THUMBNAIL_WIDTH, THUMBNAIL_GENERATE_SPLIT_COUNT } from '@src/render/pages/clip/constants';

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
  const { timeMarks, timeMarkViewDistanceWidth, totalThumbnailCount } = params;
  // 1.计算出需要展示的缩略图张数
  const needThumbnailCount = Math.ceil(timeMarkViewDistanceWidth / THUMBNAIL_WIDTH);
  // 2.计算出时间差值映射的缩略图下标范围
  const minIndex = Math.floor(timeMarks[0] / THUMBNAIL_GENERATE_SPLIT_COUNT);
  const maxIndex = Math.floor(timeMarks[1] / THUMBNAIL_GENERATE_SPLIT_COUNT);
  // 3.计算出系数
  let coefficient = 1;
  if (totalThumbnailCount > needThumbnailCount) coefficient = needThumbnailCount / totalThumbnailCount;
  else coefficient = totalThumbnailCount / needThumbnailCount;
  // 5.按系数返回缩略图
  const picIndexTimeMarks = [];
  let mark = minIndex;
  picIndexTimeMarks[0] = mark;
  for (let i = 1; i < needThumbnailCount; i++) {
    mark = mark + coefficient;
    if (mark >= maxIndex) mark = maxIndex;
    picIndexTimeMarks[i] = mark;
  }
  console.log(picIndexTimeMarks);
  return picIndexTimeMarks || [];
};

export default {
  demandTimeMarksThumbnails,
};
