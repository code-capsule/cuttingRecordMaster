import React, { useMemo } from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '@render/pages/clip/constants';
import ClipCore from '@render/pages/clip/core';

interface IProps {
  itemPXWidth: number; // 视频素材的宽度
  itemInfo: MasterResourceType.IVideoResource | null; // 视频的信息
}

const MainVideoItem = React.memo((props: IProps) => {
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const boxWidth = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.boxWidth) || 0;
  const trackWidth = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.trackWidth) || 0;
  const scrollLeft = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.scrollLeft) || 0;

  const step = (unitTime / unitPX) * THUMBNAIL_WIDTH;
  const leftExcessTime = (props?.itemInfo?.startTime || 0) % step || 0; //第一张缩略图左边多出的部分
  const leftExcessPX = (leftExcessTime * unitPX) / unitTime;

  // 1.获取视频素材的所有缩略图
  const itemAllThumbnails = useMemo(() => {
    return props?.itemInfo?.data?.thumbnails || [];
  }, [props?.itemInfo]);

  // 2.计算得到屏幕可视区域的时间范围
  const boxTime = useMemo(() => {
    return {
      leftTime: ClipCore.utilsManager.unitScale.getBoxViewLeftTime({ scrollLeft, unitPX, unitTime }),
      rightTime: ClipCore.utilsManager.unitScale.getBoxViewRightTime({ unitPX, unitTime, scrollLeft, boxWidth, trackWidth }),
    };
  }, [unitPX, unitTime, scrollLeft, boxWidth, trackWidth]);

  // 3.得到当前片段的时间范围
  const cellTime = useMemo(() => {
    return {
      leftTime: props?.itemInfo?.startTime || 0,
      rightTime: (props?.itemInfo?.startTime || 0) + (props?.itemInfo?.duration || 0) || 0,
    };
  }, [props?.itemInfo?.startTime, props?.itemInfo?.duration]);

  // 4.获取视频片段在可视区域内展示的时间范围
  const timeMarks = ClipCore.utilsManager.unitScale.getCellAndBoxTimeIntersection(cellTime, boxTime);

  // 5.根据时间范围抽取指定的张数
  const viewThumbnails = useMemo(() => {
    if (timeMarks.length === 0 || timeMarks.length === 1) return [];
    const timeMarkViewDistanceWidth = Math.ceil(((timeMarks[1] - timeMarks[0]) * unitPX) / unitTime);
    const needThumbnailTimeMarks = ClipCore.utilsManager.thumbnail.demandTimeMarksThumbnails({
      timeMarks,
      timeMarkViewDistanceWidth,
      totalThumbnailCount: itemAllThumbnails?.length,
    });
    // 取出缩略图数据
    return needThumbnailTimeMarks?.map((time: number) => {
      if (itemAllThumbnails?.[Math.round(time)]) return itemAllThumbnails?.[Math.round(time)];
      else return itemAllThumbnails?.[itemAllThumbnails?.length - 1];
    });
  }, [timeMarks, unitPX, unitTime, itemAllThumbnails]);

  // 6.占位DOM的宽度计算
  const { placeholderLeftDomWidth, placeholderRightDomWidth } = useMemo(() => {
    const offsetLeftTime = boxTime?.leftTime - cellTime?.leftTime <= 0 ? 0 : boxTime?.leftTime - cellTime?.leftTime;
    const offsetLeftWidth = Math.ceil((offsetLeftTime * unitPX) / unitTime);
    const offsetRightWidth =
      props?.itemPXWidth - offsetLeftWidth - viewThumbnails.length > 0 ? props?.itemPXWidth - offsetLeftWidth - viewThumbnails.length : 0;
    return {
      placeholderLeftDomWidth: offsetLeftWidth,
      placeholderRightDomWidth: offsetRightWidth,
    };
  }, [props?.itemPXWidth, viewThumbnails.length, cellTime, unitPX, unitTime, boxTime]);

  return (
    <div className="main-video-item">
      <div
        className="cell-body"
        style={{
          marginLeft: -leftExcessPX + 'px',
          height: THUMBNAIL_HEIGHT,
        }}
      >
        <div className="placeholder-thumbnail-wrap" style={{ width: placeholderLeftDomWidth }}></div>
        <div className="cell-view-thumbnail-wrap">
          {viewThumbnails?.map((t, idx) => {
            return <img key={idx} src={t} alt="" draggable="false" style={{ width: THUMBNAIL_WIDTH + 'px', objectFit: 'cover' }} />;
          })}
        </div>
        <div className="placeholder-thumbnail-wrap" style={{ width: placeholderRightDomWidth }}></div>
      </div>
    </div>
  );
});

export default MainVideoItem;
