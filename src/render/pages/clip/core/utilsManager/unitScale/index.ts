import { TRACK_UNIT_GRID_NUMBER } from '@render/pages/clip/constants';
/**
 * @description 获得总格子数
 * 总视频时长的轨道宽度/大刻度宽度 = 大刻度格子数量
 * 大刻度数量 * TRACK_UNIT_GRID_NUMBER = 小刻度格子数量
 */
const getVideoTotalScalesByUnitPX = (params: { trackWidth: number; unitPX: number }) => {
  const { trackWidth, unitPX } = params;
  return Math.ceil((trackWidth / unitPX) * TRACK_UNIT_GRID_NUMBER) || 0;
};

/**
 * @description 获取所有视频的总时长
 * @param {MasterResourceType.IVideoResource[]} videoMaterials 视频素材
 * @returns {number}
 */
const getVideoMaterialTotalDuration = (videoMaterials: MasterResourceType.IVideoResource[]): number => {
  if (!videoMaterials || videoMaterials?.length === 0) return 0;
  const totalDuration = videoMaterials?.reduce((prev, next) => {
    return prev + (next?.duration || 0);
  }, 0);
  return Math.floor((totalDuration * 1000) / 1000);
};

interface ICalcBoxViewParams {
  scrollLeft: number; // 偏移量
  unitPX: number; // 单位宽度
  unitTime: number; // 单位刻度尺
}
type IGetLeftTimeParams = ICalcBoxViewParams;
/**
 * @description 计算屏幕可视区域的 leftTime
 * @param {IGetLeftTimeParams} params
 * @returns {number} leftTime
 */
const getBoxViewLeftTime = (params: IGetLeftTimeParams): number => {
  const { scrollLeft, unitPX, unitTime } = params;
  const leftTime = Math.floor((scrollLeft * unitTime) / unitPX);
  return leftTime;
};

interface IGetRightTimeParams extends ICalcBoxViewParams {
  boxWidth: number; // 可视区域宽度
  trackWidth: number; // 轨道总宽度
}
/**
 * @description 计算屏幕可视区域的 rightTime
 * @param {IGetRightTimeParams} params
 * @returns {number} leftTime
 */
const getBoxViewRightTime = (params: IGetRightTimeParams): number => {
  const { scrollLeft, unitPX, unitTime, boxWidth, trackWidth } = params;
  const calcTime = Math.ceil(((scrollLeft + boxWidth) * unitTime) / unitPX);
  const rightTime = calcTime < (trackWidth / unitPX) * unitTime ? calcTime : (trackWidth / unitPX) * unitTime;
  return rightTime;
};

interface ITimeParams {
  leftTime: number;
  rightTime: number;
}
/**
 * @description 计算片段与可视区域的时间交集
 * @param {ITimeParams} boxTime 可视区域时间范围
 * @param {ITimeParams} cellTime 视频片段区域时间范围
 * @returns {number[]} 范围区间
 */
const getCellAndBoxTimeIntersection = (cellTime: ITimeParams, boxTime: ITimeParams): number[] => {
  let timeMarks: number[] = [];
  // 情况1，该片段不存在可视区域
  if (cellTime.rightTime <= boxTime.leftTime) {
    timeMarks = [];
  }
  // 情况2，该片段与可视区域存在右交集
  if (cellTime.leftTime <= boxTime.leftTime && cellTime.rightTime > boxTime.leftTime && cellTime.rightTime <= boxTime.rightTime) {
    timeMarks = [boxTime.leftTime, cellTime.rightTime];
  }
  // 情况3，该片段完全在可视区域内
  if (cellTime.leftTime >= boxTime.leftTime && cellTime.rightTime > boxTime.leftTime && cellTime.rightTime <= boxTime.rightTime) {
    timeMarks = [cellTime.leftTime, cellTime.rightTime];
  }
  // 情况4，该片段与可视区域存在左交集
  if (cellTime.leftTime >= boxTime.leftTime && cellTime.leftTime < boxTime.rightTime && cellTime.rightTime >= boxTime.rightTime) {
    timeMarks = [cellTime.leftTime, boxTime.rightTime];
  }
  // 情况5，该片段完全超出可视区域
  if (cellTime.leftTime <= boxTime.leftTime && cellTime.rightTime >= boxTime.rightTime) {
    timeMarks = [boxTime.leftTime, boxTime.rightTime];
  }
  return timeMarks;
};

export default { getVideoTotalScalesByUnitPX, getVideoMaterialTotalDuration, getBoxViewLeftTime, getBoxViewRightTime, getCellAndBoxTimeIntersection };
