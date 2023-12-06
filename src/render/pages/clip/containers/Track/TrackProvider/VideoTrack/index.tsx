import React from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import MainVideoItem from './MainVideoItem';
import { EResourceType } from '@src/typings/resource/enum';
import { trackPageActions } from '@common/stores/reduxStore/actions';

interface IProps {
  style?: React.CSSProperties;
}

const VideoTrack = (props: IProps) => {
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const videoMaterials = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);
  const activeMaterial = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.activeMaterial || null, shallowEqual);

  return (
    <div className="clip-track-video" id="clip-track-video" style={{ ...props?.style }}>
      {videoMaterials?.map((vm: MasterResourceType.IVideoResource, idx) => {
        const itemPXWidth = ((vm?.duration || 0) * unitPX) / unitTime < 0 ? 0 : ((vm?.duration || 0) * unitPX) / unitTime;
        return (
          <React.Fragment key={`${vm?.uid}_${idx}`}>
            <div
              className="clip-track-video-cell-item"
              style={{ width: `${itemPXWidth}px` }}
              onClick={(e) => {
                e?.stopPropagation?.();
                e?.nativeEvent?.stopImmediatePropagation();
                trackPageActions.updateTrackInfo?.({ activeMaterial: vm });
              }}
            >
              <div className="clip-track-video-cell-line" />
              <MainVideoItem itemPXWidth={itemPXWidth} itemInfo={vm} />
              {activeMaterial && activeMaterial?.uid ? <div className="clip-track-video-cell-item-active"></div> : null}
              {activeMaterial && activeMaterial?.type === EResourceType.video && activeMaterial?.uid ? (
                <div className="clip-track-video-cell-item-active"></div>
              ) : null}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default VideoTrack;
