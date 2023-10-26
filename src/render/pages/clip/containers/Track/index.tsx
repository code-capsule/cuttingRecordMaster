import React from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';

const Track = React.memo(() => {
  const videoMaterial = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);

  return (
    <div className="clip-track-container">
      <div className="clip-track-wrapper-outer" style={{ paddingLeft: 16 }} onClick={() => {}}>
        <div className="clip-track-wrapper-inner" id="clip-track-wrapper-inner">
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
  );
});

export default Track;
