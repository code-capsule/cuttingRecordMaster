import React, { useCallback } from 'react';
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

  return (
    <div className="clip-toolbar-domain-container">
      <div className={'clip-track-gears-slider '}>
        <IcCommonSubGearsSvg className="sub-gears-svg" onClick={() => onDebounceChangeGears(-1)} />
        <div className="clip-slider">
          <Slider
            value={timeScaleGears}
            min={timeScaleMinGears}
            max={timeScaleMaxGears}
            onChange={(v) => {
              const fn = debounce((nextGears) => {
                const nextUnitTime = TRACK_UNIT_TIME_GEARS[nextGears] || TRACK_UNIT_TIME;
                trackPageActions.updateTrackInfo?.({ timeScaleGears: nextGears, unitTime: nextUnitTime });
              }, 16.7);
              fn(v);
            }}
          />
        </div>
        <IcCommonAddGearsSvg className="add-gears-svg" onClick={() => onDebounceChangeGears(1)} />
      </div>
    </div>
  );
});

export default Toolbar;
