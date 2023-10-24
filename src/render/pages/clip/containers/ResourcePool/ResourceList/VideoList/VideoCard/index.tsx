import React, { useRef } from 'react';
import './index.less';
import { formatSeconds } from '@common/utils/time';
import DefaultVideoImage from './defaultVideoImage.png';
interface IProps {
  /**
   * @description 视频资源
   */
  resource: MasterResourceType.IVideoResource;
  onRetryMaterial?: () => void;
  onDeleteMaterial?: (material?: MasterResourceType.IVideoResource) => void;
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
      }}
    >
      <div className="resource-video-card-cover">
        <img
          ref={imageRef}
          className="resource-video-card-cover-url"
          src={props?.resource?.isExistResource ? props?.resource?.cover : DefaultVideoImage}
          onError={onloadImageError}
        />
      </div>
      <div className={`resource-video-card-hover-mask ${!props?.resource?.isExistResource ? 'not-exist-video-resource-mask' : ''}`}>
        <div className="resource-video-button" onClick={() => props?.onRetryMaterial?.()}>
          重录
        </div>
        <div className="resource-video-button" onClick={() => props?.onDeleteMaterial?.(props?.resource)}>
          删除
        </div>
      </div>
      <div className="resource-video-card-duration">{props?.resource?.data?.duration && formatSeconds(props?.resource?.data?.duration)}</div>
      <div className="resource-video-card-name">{props?.resource?.name}</div>
      {/* 不存在资源 */}
      <div className={`resource-video-card-not-found ${!props?.resource?.isExistResource ? 'not-exist-video-resource' : ''}`}>
        <div className="resource-video-card-not-found-label">媒体丢失</div>
        <div className="resource-video-card-not-found-label">Media Not Found</div>
      </div>
    </div>
  );
});

export default VideoCard;
