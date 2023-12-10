import React, { useMemo, useCallback } from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { useVirtual } from 'react-virtual';
import { formatSeconds } from '@src/common/utils/time';
import { TRACK_UNIT_PX, TRACK_UNIT_GRID_NUMBER } from '@render/pages/clip/constants';
import ClipCoreManager from '@render/pages/clip/core';

interface IProps {
  parentElementRef: React.RefObject<HTMLDivElement>;
  /**
   * @description 默认的轨道宽度
   * 1.时间刻度格子是通过 trackWidth / unitPX 计算得出
   * 2.当轨道片段为空, trackWidth = 0，需要给一个默认宽度，否则不会显示时间刻度尺
   */
  defaultTrackWidth?: number;
}

const UnitScaleBar = React.memo((props: IProps) => {
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const trackWidth = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.trackWidth) || 0;

  const totalScales = useMemo(() => {
    if (!trackWidth) {
      if (props?.defaultTrackWidth) {
        return ClipCoreManager.utilsManager.unitScale?.getVideoTotalScalesByUnitPX({ unitPX, trackWidth: props?.defaultTrackWidth });
      } else return 0;
    }
    return ClipCoreManager.utilsManager.unitScale?.getVideoTotalScalesByUnitPX({ unitPX, trackWidth });
  }, [unitPX, trackWidth, props?.defaultTrackWidth]);

  const timeScalesVirtualizer = useVirtual({
    parentRef: props?.parentElementRef,
    horizontal: true,
    size: totalScales,
    paddingStart: 0,
    estimateSize: useCallback(() => unitPX / TRACK_UNIT_GRID_NUMBER, [unitPX, unitTime]),
    overscan: 5,
    scrollToFn: () => {},
  });

  return (
    <div
      id="time-ruler-wrapper"
      className="time-ruler-wrapper"
      style={{
        height: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <React.Fragment>
        {timeScalesVirtualizer?.virtualItems?.map((scaleItem) => {
          // 视频轨道无数据或正在预览资源池里的资源，则处于forbidden状态
          const { index, start } = scaleItem;
          const isFirstUnit = index === 0;
          let isUnit = false;
          let unitNum = 0;
          isUnit = index % TRACK_UNIT_GRID_NUMBER === 0;
          if (isUnit) unitNum = index / TRACK_UNIT_GRID_NUMBER;
          return (
            <div
              key={`${index}_${start}`}
              className={`${isUnit ? 'unit-item' : 'scale-item'} `}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: TRACK_UNIT_PX / 10 + 'px',
                transform: `translateX(${start}px)`,
              }}
            >
              {isUnit && (
                <div className={'unitTime-text '} style={{ transform: isFirstUnit ? 'translateX(0)' : 'translateX(-50%)' }}>
                  {formatSeconds(unitNum * unitTime)}
                </div>
              )}
            </div>
          );
        })}
      </React.Fragment>
    </div>
  );
});

export default UnitScaleBar;
