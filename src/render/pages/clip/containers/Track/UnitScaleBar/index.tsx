import React from 'react';
import './index.less';
import { TRACK_UNIT_PX, TRACK_UNIT_GRID_NUMBER, TRACK_UNIT_TIME } from '@render/pages/clip/constants';
import { formatSeconds } from '@src/common/utils/time';

const UnitScaleBar = React.memo(() => {
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
        {new Array(300)?.fill(1)?.map((scaleItem, index) => {
          // 视频轨道无数据或正在预览资源池里的资源，则处于forbidden状态
          const isFirstUnit = index === 0;
          let isUnit = false;
          let unitNum = 0;
          isUnit = index % TRACK_UNIT_GRID_NUMBER === 0;
          if (isUnit) unitNum = index / TRACK_UNIT_GRID_NUMBER;
          return (
            <div
              key={`${index}`}
              className={`${isUnit ? 'unit-item' : 'scale-item'} `}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: TRACK_UNIT_PX / 10 + 'px',
                transform: `translateX(${(index * TRACK_UNIT_PX) / TRACK_UNIT_GRID_NUMBER}px)`,
              }}
            >
              {isUnit && (
                <div className={'unitTime-text '} style={{ transform: isFirstUnit ? 'translateX(0)' : 'translateX(-50%)' }}>
                  {formatSeconds(unitNum * TRACK_UNIT_TIME)}
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
