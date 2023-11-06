import React from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import { TRACK_UNIT_PX, TRACK_UNIT_TIME } from '@src/render/pages/clip/constants';
import MainVideoItem from './MainVideoItem';

interface IProps {
  style?: React.CSSProperties;
}

const VideoTrack = (props: IProps) => {
  const videoMaterials = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);
  const activeMaterial = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.activeMaterial || null, shallowEqual);

  return (
    <div className="clip-track-video" id="clip-track-video" style={{ ...props?.style }}>
      {videoMaterials?.map((vm: MasterResourceType.IVideoResource, idx) => {
        const itemPXWidth = ((vm?.duration || 0) * TRACK_UNIT_PX) / TRACK_UNIT_TIME < 0 ? 0 : ((vm?.duration || 0) * TRACK_UNIT_PX) / TRACK_UNIT_TIME;
        return (
          <React.Fragment key={`${vm?.uid}_${idx}`}>
            <div className="clip-track-video-cell-item" style={{ width: `${itemPXWidth}px` }}>
              <div className="clip-track-video-cell-line" />
              <MainVideoItem itemPXWidth={itemPXWidth} itemInfo={vm} />
              {activeMaterial && activeMaterial?.uid ? <div className="clip-track-video-cell-item-active"></div> : null}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default VideoTrack;
