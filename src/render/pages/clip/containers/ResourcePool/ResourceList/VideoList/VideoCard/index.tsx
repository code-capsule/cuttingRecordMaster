import React, { useRef } from 'react';
import './index.less';
import { formatSeconds } from '@common/utils/time';
import DefaultVideoImage from './defaultVideoImage.png';

interface IProps {
  /**
   * @description 视频资源
   */
  resourceVideo: MasterResourceType.IVideoResource;
  /**
   * @description 预览卡片
   */
  onPreviewResource?: (resourceVideo?: MasterResourceType.IVideoResource) => void;
  /**
   * @description 添加资源到轨道区
   */
  onInsertResourceToVideoTrackCell?: (resourceVideo?: MasterResourceType.IVideoResource) => void;
}

const VideoCard = React.memo((props: IProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  /**
   * @description 图片请求错误时显示默认占位图
   */
  const onloadImageError = () => {
    if (imageRef?.current) {
      imageRef.current.src = DefaultVideoImage;
    }
  };

  return (
    <div
      className="resource-video-card-item"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
        if (props?.resourceVideo?.isExistResource) {
          props?.onPreviewResource?.(props?.resourceVideo);
        }
      }}
    >
      <div className="resource-video-card-cover">
        <img
          ref={imageRef}
          className="resource-video-card-cover-url"
          src={props?.resourceVideo?.isExistResource ? props?.resourceVideo?.data?.cover : DefaultVideoImage}
          onError={onloadImageError}
        />
      </div>
      <div className="resource-video-card-hover-mask" />
      <div className="resource-video-card-duration">
        {props?.resourceVideo?.data?.duration && formatSeconds(props?.resourceVideo?.data?.duration)}
      </div>
      <div className="resource-video-card-name">{props?.resourceVideo?.name}</div>

      {/* 不存在资源 */}
      <div className={`resource-video-card-not-found ${!props?.resourceVideo?.isExistResource ? 'is-exist-video-resource' : ''}`}>
        <div className="resource-video-card-not-found-label">媒体丢失</div>
        <div className="resource-video-card-not-found-label">Media Not Found</div>
      </div>
    </div>
  );
});

export default VideoCard;
