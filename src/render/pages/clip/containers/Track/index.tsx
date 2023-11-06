import React, { useRef } from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import Toolbar from './ToolBar';
import UnitScaleBar from './UnitScaleBar';

const Track = React.memo(() => {
  const providerElementRef = useRef<HTMLDivElement>(null);
  const videoMaterial = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);

  return (
    <div className="clip-track-container">
      <div className="clip-toolbar-container">
        <Toolbar />
      </div>
      <div className="clip-unit-scale-container">
        <UnitScaleBar />
      </div>
      <div className="clip-provider-container">
        <div className="clip-track-wrapper-outer" style={{ paddingLeft: 0 }} onClick={() => {}}>
          <div className="clip-track-wrapper-inner" id="clip-track-wrapper-inner" ref={providerElementRef}>
            {videoMaterial?.[0]?.data?.thumbnails?.map((url, idx) => {
              return (
                <div key={idx} className="clip-track-video-cell-item">
                  <img src={url} className="clip-track-video-cell-item-cover" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Track;
