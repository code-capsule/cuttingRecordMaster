import React, { useMemo } from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import ClipCoreManager from '@render/pages/clip/core';
import { EResourceType } from '@src/typings/resource/enum';

const Track = React.memo(() => {
  const videoCells = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.track?.videoTrack?.cells || [], shallowEqual);

  const targetVideoMaterial = useMemo(() => {
    // 目前我们只实现了一个视频
    if (videoCells?.[0]?.uid) return ClipCoreManager?.materialManager?.getMaterial?.(videoCells?.[0]?.materialId, EResourceType.video) as MasterResourceType.IVideoResource;
    else return null;
  }, [videoCells]);

  return (
    <div className="clip-track-container">
      <div className="clip-track-wrapper-outer" style={{ paddingLeft: 16 }} onClick={() => {}}>
        <div className="clip-track-wrapper-inner" id="clip-track-wrapper-inner">
          {targetVideoMaterial?.data?.thumbnails?.map((url, idx) => {
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
