import React from 'react';
import './index.less';
import { ReactComponent as IcCommonSubGearsSvg } from '@common/svgs/ic_common_sub_gears_normal.svg';
import { ReactComponent as IcCommonAddGearsSvg } from '@common/svgs/ic_common_add_gears_normal.svg';
import Slider from '@src/common/components/Slider';
import { useSelector, shallowEqual } from 'react-redux';

const Toolbar = React.memo(() => {
  const timeScaleGears = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.timeScaleGears, shallowEqual);
  const timeScaleMinGears = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.timeScaleMinGears, shallowEqual);
  const timeScaleMaxGears = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.timeScaleMaxGears, shallowEqual);

  return (
    <div className="clip-toolbar-domain-container">
      <div className={'clip-track-gears-slider '}>
        <IcCommonSubGearsSvg className="sub-gears-svg" />
        <div className="clip-slider">
          <Slider value={timeScaleGears} min={timeScaleMinGears} max={timeScaleMaxGears} onChange={(v) => {}} />
        </div>
        <IcCommonAddGearsSvg className="add-gears-svg" />
      </div>
    </div>
  );
});

export default Toolbar;
