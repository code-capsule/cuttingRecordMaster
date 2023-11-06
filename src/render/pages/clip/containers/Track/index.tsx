import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import { trackPageActions } from '@common/stores/reduxStore/actions';
import Toolbar from './ToolBar';
import UnitScaleBar from './UnitScaleBar';
import ClipCore from '@render/pages/clip/core';
import VideoTrack from './TrackProvider/VideoTrack';
import useInitTrackHooks from '@render/pages/clip/hooks/useInitTrackHooks';

const Track = React.memo(() => {
  const providerElementRef = useRef<HTMLDivElement>(null);
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const boxWidth = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.boxWidth) || 0;
  const trackWidth = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.trackWidth) || 0;
  const videoMaterials = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);
  const [trackElementRectSize, setTrackElementRectSize] = useState<DOMRect>(); // 轨道区元素尺寸，用此来初始化boxWidth

  // 1.初始化轨道区相关信息
  useInitTrackHooks();

  // 2.获取并更新屏幕视口可展示的内容宽度 boxWidth
  useEffect(() => {
    if (providerElementRef?.current) {
      const rect = providerElementRef?.current?.getBoundingClientRect?.();
      setTrackElementRectSize(rect);
      trackPageActions?.updateTrackInfo?.({ boxWidth: Math.floor(rect?.right - rect?.left) });
    }
  }, [providerElementRef]);

  // 3.更新视频总宽度
  useEffect(() => {
    if (boxWidth === 0 || unitPX * unitTime === 0) return;
    const totalDuration = ClipCore.utilsManager.unitScale.getVideoMaterialTotalDuration(videoMaterials);
    const calcTrackWidth = (unitPX * totalDuration) / unitTime > boxWidth ? (unitPX * totalDuration) / unitTime : boxWidth;
    trackPageActions?.updateTrackInfo?.({ trackWidth: calcTrackWidth, totalDuration });
  }, [unitPX, unitTime, boxWidth, videoMaterials]);

  return (
    <div className="clip-track-container">
      <div className="clip-toolbar-container">
        <Toolbar />
      </div>
      <div className="clip-provider-container">
        <div className="clip-track-wrapper-outer" style={{ paddingLeft: 0 }} onClick={() => {}}>
          <div className="clip-track-wrapper-inner" id="clip-track-wrapper-inner" ref={providerElementRef} onScroll={() => {}}>
            {trackElementRectSize && (
              <div style={{ height: trackElementRectSize?.height, width: trackWidth ? `${trackWidth}px` : '' }}>
                {/* 场景一：初始化状态 */}
                {/* 场景二：只有视频素材+[其他素材]状态 */}
                <React.Fragment>
                  <div className="unit-scale-container">
                    <UnitScaleBar parentElementRef={providerElementRef} />
                  </div>
                  <VideoTrack />
                </React.Fragment>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Track;
