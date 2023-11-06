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
const getVideoMaterialTotalDuration = (videoMaterials: MasterResourceType.IVideoResource[]) => {
  if (!videoMaterials || videoMaterials?.length === 0) return 0;
  const totalDuration = videoMaterials?.reduce((prev, next) => {
    return prev + (next?.duration || 0);
  }, 0);
  return Math.floor((totalDuration * 1000) / 1000);
};

export default { getVideoTotalScalesByUnitPX, getVideoMaterialTotalDuration };
