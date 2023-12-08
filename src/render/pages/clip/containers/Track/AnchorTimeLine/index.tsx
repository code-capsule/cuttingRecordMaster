import React, { useCallback, useRef, useMemo } from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import { trackPageActions } from '@common/stores/reduxStore/actions';
import useMouseClickPositionHooks from '@render/pages/clip/hooks/useMouseClickPositionHooks';

const AnchorTimeLine = React.memo(() => {
  const anchorTimeElementRef = useRef<any>();
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const anchorTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.anchorTime) || 0;
  const anchorX = (anchorTime * unitPX) / unitTime;

  const totalDuration = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.totalDuration) || 0;
  const activeMaterial = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.activeMaterial, shallowEqual);

  const closureValueRef = useRef<{ anchorTime: number; totalDuration: number }>();
  closureValueRef.current = { anchorTime, totalDuration };

  const onMouseDownInAnchorTimeEvent = useCallback(() => {
    window.document.addEventListener('mousemove', handleWindowMouseMoveRef.current);
    window.document.addEventListener('mouseup', handleWindowMouseUpRef.current);
  }, []);

  const { getMouseAnchorTime } = useMouseClickPositionHooks();
  const handleWindowMouseMoveRef = useRef<any>();
  handleWindowMouseMoveRef.current = useCallback((e: any) => {
    e?.stopPropagation();
    e?.nativeEvent?.stopImmediatePropagation();
    const newAnchorTime = getMouseAnchorTime(e);
    trackPageActions?.updateTrackInfo?.({ anchorTime: newAnchorTime });
  }, []);

  const handleWindowMouseUpRef = useRef<any>();
  handleWindowMouseUpRef.current = useCallback(() => {
    window.document.removeEventListener('mousemove', handleWindowMouseMoveRef.current);
    window.document.removeEventListener('mouseup', handleWindowMouseUpRef.current);
  }, []);

  const isActive = useMemo(() => {
    return !!activeMaterial;
  }, [activeMaterial]);

  return (
    <div
      className={`anchor-time-line ${isActive ? 'active' : ''}`}
      ref={anchorTimeElementRef}
      style={{ transform: `translateX(${anchorX}px)` }}
      onMouseDown={() => {
        onMouseDownInAnchorTimeEvent();
      }}
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
      }}
    >
      <div className="anchor"></div>
      <div className="line"></div>
    </div>
  );
});

export default AnchorTimeLine;
