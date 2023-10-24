import React, { useRef } from 'react';
import './index.less';
import { formatSeconds } from '@common/utils/time';
import DefaultVideoImage from './defaultVideoImage.png';
interface IProps {
  /**
   * @description 视频资源
   */
  material: MasterResourceType.IVideoResource;
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
      className="material-video-card-item"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
      }}
    >
      <div className="material-video-card-cover">
        <img
          ref={imageRef}
          className="material-video-card-cover-url"
          src={props?.material?.isExistResource ? props?.material?.cover : DefaultVideoImage}
          onError={onloadImageError}
        />
      </div>
      <div className={`material-video-card-hover-mask ${!props?.material?.isExistResource ? 'not-exist-video-material-mask' : ''}`}>
        <div className="material-video-button" onClick={() => props?.onRetryMaterial?.()}>
          重录
        </div>
        <div className="material-video-button" onClick={() => props?.onDeleteMaterial?.(props?.material)}>
          删除
        </div>
      </div>
      <div className="material-video-card-duration">{props?.material?.data?.duration && formatSeconds(props?.material?.data?.duration)}</div>
      <div className="material-video-card-name">{props?.material?.name}</div>
      {/* 不存在资源 */}
      <div className={`material-video-card-not-found ${!props?.material?.isExistResource ? 'not-exist-video-material' : ''}`}>
        <div className="material-video-card-not-found-label">媒体丢失</div>
        <div className="material-video-card-not-found-label">Media Not Found</div>
      </div>
    </div>
  );
});

export default VideoCard;
