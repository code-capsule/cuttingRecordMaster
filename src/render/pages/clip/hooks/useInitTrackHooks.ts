/**
 * @description 初始化轨道上相关的信息
 */
import ClipCore from '@render/pages/clip/core';
import { useEffect } from 'react';
import { trackPageActions } from '@common/stores/reduxStore/actions';
import { TRACK_UNIT_PX, TRACK_UNIT_TIME_GEARS, TRACK_UNIT_TIME } from '@render/pages/clip/constants';

const useInitTrackHooks = () => {
  const initTrackInfoParams = (totalDuration: number) => {
    // 找到默认 unitTime 在数组中的下标
    const findIdx = TRACK_UNIT_TIME_GEARS?.findIndex((unit) => unit === TRACK_UNIT_TIME);
    const _gearsIndex = findIdx < 0 ? TRACK_UNIT_TIME_GEARS.length - 1 : findIdx;
    trackPageActions.updateTrackInfo?.({
      unitPX: TRACK_UNIT_PX,
      unitTime: TRACK_UNIT_TIME_GEARS[_gearsIndex], // 时间刻度默认60s为一个大刻度尺
      scrollLeft: 0,
      totalDuration,
      timeScaleGears: _gearsIndex,
      timeScaleMinGears: 0,
      timeScaleMaxGears: TRACK_UNIT_TIME_GEARS.length - 1,
    });
  };
  useEffect(() => {
    const projectInfo = window.master.stores.localStore.project.getProjectInfo() as MasterProjectType.IProjectDataInfo;
    const videoMaterials = projectInfo?.material?.video || [];
    const totalDuration = ClipCore.utilsManager.unitScale.getVideoMaterialTotalDuration(videoMaterials);
    initTrackInfoParams(totalDuration);
  }, []);
};

export default useInitTrackHooks;
