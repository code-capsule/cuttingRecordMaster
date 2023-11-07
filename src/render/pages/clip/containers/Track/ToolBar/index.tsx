import React, { useCallback, useMemo } from 'react';
import './index.less';
import { debounce } from 'lodash';
import { useSelector, shallowEqual } from 'react-redux';
import { trackPageActions } from '@common/stores/reduxStore/actions';
import { ReactComponent as IcCommonSubGearsSvg } from '@common/svgs/ic_common_sub_gears_normal.svg';
import { ReactComponent as IcCommonAddGearsSvg } from '@common/svgs/ic_common_add_gears_normal.svg';
import { TRACK_UNIT_TIME_GEARS, TRACK_UNIT_TIME } from '@render/pages/clip/constants';
import Slider from '@src/common/components/Slider';

const Toolbar = React.memo(() => {
  const timeScaleGears = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.timeScaleGears, shallowEqual) || 0;
  const timeScaleMinGears = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.timeScaleMinGears, shallowEqual) || 0;
  const timeScaleMaxGears = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.timeScaleMaxGears, shallowEqual) || 0;
  const textMaterials = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.text || [], shallowEqual);
  const imageMaterials = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.image || [], shallowEqual);
  const videoMaterials = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);

  const onChangeGears = useCallback(
    (val: number) => {
      let nextGears = timeScaleGears + val;
      if (nextGears < timeScaleMinGears) nextGears = timeScaleMinGears;
      if (nextGears > timeScaleMaxGears) nextGears = timeScaleMaxGears;
      // 更新 unitTime
      const nextUnitTime = TRACK_UNIT_TIME_GEARS[nextGears] || TRACK_UNIT_TIME;
      trackPageActions.updateTrackInfo?.({ timeScaleGears: nextGears, unitTime: nextUnitTime });
    },
    [timeScaleGears, timeScaleMinGears, timeScaleMaxGears]
  );
  const onDebounceChangeGears = debounce(onChangeGears, 16.7);

  const materialStatus = useMemo(() => {
    return {
      hasText: textMaterials?.length > 0,
      hasVideo: videoMaterials?.length > 0,
      hasImage: imageMaterials?.length > 0,
      hasMaterial: textMaterials?.length > 0 || videoMaterials?.length > 0 || imageMaterials?.length > 0,
    };
  }, [videoMaterials, textMaterials, imageMaterials]);

  return (
    <div className="clip-toolbar-domain-container">
      <div className={`clip-track-gears-slider ${materialStatus?.hasMaterial ? '' : 'disabled-gears-slider'}`}>
        <IcCommonSubGearsSvg
          className="sub-gears-svg"
          onClick={() => {
            if (materialStatus?.hasMaterial) onDebounceChangeGears(-1);
          }}
        />
        <div className="clip-slider">
          <Slider
            value={timeScaleGears}
            min={timeScaleMinGears}
            max={timeScaleMaxGears}
            disabled={!materialStatus?.hasMaterial}
            onChange={(v) => {
              const fn = debounce((nextGears) => {
                const nextUnitTime = TRACK_UNIT_TIME_GEARS[nextGears] || TRACK_UNIT_TIME;
                trackPageActions.updateTrackInfo?.({ timeScaleGears: nextGears, unitTime: nextUnitTime });
              }, 16.7);
              if (materialStatus?.hasMaterial) fn(v);
            }}
          />
        </div>
        <IcCommonAddGearsSvg
          className="add-gears-svg"
          onClick={() => {
            if (materialStatus?.hasMaterial) onDebounceChangeGears(1);
          }}
        />
      </div>
    </div>
  );
});

export default Toolbar;
