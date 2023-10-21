import React from 'react';
import './index.less';
import { formatSeconds, formatTransformUpdateTime } from '@common/utils/time';

const ProductCard = (props: { data: MasterDraftType.IDraftItem }) => {
  return (
    <div
      className="product-video"
      id={`video_${props?.data?.id}`}
      key={`video_${props?.data?.id}`}
      onMouseOver={() => {
        const parentElement = document.getElementById(`video_${props?.data?.id}`);
        if (parentElement) {
          const videoElement = parentElement.querySelector('video');
          if (videoElement) videoElement?.play();
        }
      }}
      onMouseLeave={() => {
        const parentElement = document.getElementById(`video_${props?.data?.id}`);
        if (parentElement) {
          const videoElement = parentElement.querySelector('video');
          if (videoElement) videoElement?.pause();
        }
      }}
    >
      <div className="product-video-time">{formatSeconds(props?.data?.duration)}</div>
      {props?.data?.videoUrl ? (
        <video className="product-video-source">
          <source src={props?.data?.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img src={props?.data?.cover} className="product-cover" alt="" />
      )}
      <div className="product-video-name">{props?.data?.projectName}</div>
      <div className="product-video-view">{formatTransformUpdateTime(props?.data?.updateTime)}</div>
    </div>
  );
};

export default ProductCard;
