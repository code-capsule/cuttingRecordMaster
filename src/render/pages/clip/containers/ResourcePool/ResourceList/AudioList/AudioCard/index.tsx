import React, { useRef } from 'react';
import './index.less';
import { formatSeconds } from '@common/utils/time';
import DefaultVideoImage from './defaultVideoImage.png';
import { ReactComponent as IcCommonAddSvg } from '@common/svgs/ic_common_add.svg';

interface IProps {
  /**
   * @description 视频资源
   */
  resource: MasterResourceType.IAudioResource;
  /**
   * @description 预览卡片
   */
  onPreviewResource?: (resource?: MasterResourceType.IAudioResource) => void;
  /**
   * @description 添加资源到轨道区
   */
  onInsertResourceToVideoTrackCell?: (resource?: MasterResourceType.IAudioResource) => void;
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
      className="resource-audio-card-item"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
        if (props?.resource?.isExistResource) {
          props?.onPreviewResource?.(props?.resource);
        }
      }}
    >
      <div className="resource-audio-card-flex">
        <img
          ref={imageRef}
          className="resource-audio-card-cover-url"
          src={props?.resource?.isExistResource ? props?.resource?.cover : DefaultVideoImage}
          onError={onloadImageError}
        />
        <div className="resource-audio-card-content">
          <div className="resource-audio-card-name">{props?.resource?.name}</div>
          <div className="resource-audio-card-duration">{props?.resource?.data?.duration && formatSeconds(props?.resource?.data?.duration)}</div>
          <IcCommonAddSvg className="resource-audio-card-add-svg" />
        </div>
      </div>
      {/* 不存在资源 */}
      <div className={`resource-audio-card-not-found ${!props?.resource?.isExistResource ? 'is-exist-audio-resource' : ''}`}>
        <div className="resource-audio-card-not-found-label">媒体丢失</div>
        <div className="resource-audio-card-not-found-label">Media Not Found</div>
      </div>
    </div>
  );
});

export default VideoCard;
