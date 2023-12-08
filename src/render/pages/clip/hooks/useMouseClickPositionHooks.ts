import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { clamp } from 'lodash';

/**
 * @description 鼠标点击轨道上的任意位置，通过落点坐标和偏移量，计算出正确的位置和时间轴上的时间
 */
const useMouseClickPosition = () => {
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const scrollLeft = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.scrollLeft) || 0;
  const totalDuration = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.totalDuration) || 0;

  const mouseClickVarRef = useRef<any>();
  mouseClickVarRef.current = {
    unitPX,
    unitTime,
    scrollLeft,
    totalDuration,
  };

  const getMouseXPosition = useCallback((e: MouseEvent) => {
    const { scrollLeft } = mouseClickVarRef.current;
    return scrollLeft + e?.clientX - 8; // 减去左侧8px的偏移量
  }, []);

  const calcAnchorTimeByPX = useCallback((anchorX: number): number => {
    const { unitPX, unitTime, totalDuration } = mouseClickVarRef.current;
    const modifyAnchorX = anchorX;
    // 异常处理
    if (unitPX === 0 || unitTime === 0) return 0;
    const anchorTime = (modifyAnchorX * unitTime) / unitPX;
    let newAnchorTime;
    if (anchorTime < 0) {
      newAnchorTime = 0;
    } else if (anchorTime >= totalDuration) {
      newAnchorTime = totalDuration;
    } else {
      newAnchorTime = anchorTime;
    }
    return clamp(Math.round(newAnchorTime * 1000) / 1000, Math.round(newAnchorTime * 1000) / 1000, totalDuration); // 由点击click或者move产生的anchorTime的精度是1ms
  }, []);

  const getMouseAnchorTime = useCallback((e: MouseEvent) => {
    const newAnchorX = getMouseXPosition(e);
    const newAnchorTime = calcAnchorTimeByPX(newAnchorX);
    return newAnchorTime;
  }, []);

  return { getMouseAnchorTime };
};

export default useMouseClickPosition;
