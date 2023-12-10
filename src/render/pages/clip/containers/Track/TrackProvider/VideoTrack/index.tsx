import React from 'react';
import './index.less';
import { isNull } from 'lodash';
import { useSelector, shallowEqual } from 'react-redux';
import { EResourceType } from '@src/typings/resource/enum';
import { trackPageActions } from '@common/stores/reduxStore/actions';
import ClipCoreManager from '@render/pages/clip/core';
import MainVideoItem from './MainVideoItem';

interface IProps {
  style?: React.CSSProperties;
}

const VideoTrack = (props: IProps) => {
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const videoCells = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.track?.videoTrack?.cells || [], shallowEqual);
  const activeTrackCells = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.activeTrackCells || [], shallowEqual);

  return (
    <div className="clip-track-video" id="clip-track-video" style={{ ...props?.style }}>
      {videoCells?.map((vc: MasterTrackCell.IVideoTrackCell, idx) => {
        const targetVideoMaterial = ClipCoreManager.materialManager.getMaterial(vc?.materialId, EResourceType.video);
        const itemPXWidth =
          ((targetVideoMaterial?.duration || 0) * unitPX) / unitTime < 0 ? 0 : ((targetVideoMaterial?.duration || 0) * unitPX) / unitTime;
        return (
          <React.Fragment key={`${targetVideoMaterial?.uid}_${idx}`}>
            <div
              className="clip-track-video-cell-item"
              style={{ width: `${itemPXWidth}px` }}
              onClick={(e) => {
                e?.stopPropagation?.();
                e?.nativeEvent?.stopImmediatePropagation();
                trackPageActions.updateTrackInfo?.({ activeTrackCells: [vc] });
              }}
            >
              <div className="clip-track-video-cell-line" />
              {targetVideoMaterial && !isNull(targetVideoMaterial) && (
                <MainVideoItem itemPXWidth={itemPXWidth} itemInfo={targetVideoMaterial as MasterResourceType.IVideoResource} />
              )}
              {activeTrackCells?.length > 0 && activeTrackCells?.[0]?.type === EResourceType.video && activeTrackCells?.[0]?.uid ? (
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
