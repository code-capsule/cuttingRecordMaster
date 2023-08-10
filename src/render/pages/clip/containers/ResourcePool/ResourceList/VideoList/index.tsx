import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import Scrollbar from '@src/common/components/ScrollBar';
import VideoCard from './VideoCard';

interface IProps {
  data: MasterResourceType.IVideoResource[];
}

const LIST: MasterResourceType.IVideoResource[] = [
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '哆啦A梦高清壁纸图.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
    cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\哆啦A梦高清壁纸图.jpg',
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '海绵宝宝与派大星.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
    cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\海绵宝宝与派大星.jpg',
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '蜡笔小新高清剧组照片.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
    cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\蜡笔小新高清剧组照片.jpg',
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      thumbnails: [],
    },
  },
];

const VideoList = (props: IProps) => {
  const resourceElement = useRef<HTMLDivElement>(null);
  const [resourceElementRect, setResourceElementRect] = useState<DOMRect>();

  useEffect(() => {
    if (resourceElement?.current) {
      const rect = resourceElement?.current?.getBoundingClientRect();
      setResourceElementRect(rect);
    }
  }, [resourceElement?.current]);

  return (
    <div className="clip-resource-video-container">
      <div className="clip-render-video-box" ref={resourceElement}>
        {resourceElementRect?.height && (
          <Scrollbar maxHeight={resourceElementRect.height} y={{ show: true }}>
            <div className="clip-video-scrollbar-list">
              {LIST.map((resource: MasterResourceType.IVideoResource, idx: number) => {
                return (
                  <div key={`${resource?.uid}_${idx}`} className="clip-video-scrollbar-item">
                    <VideoCard resource={resource} />
                  </div>
                );
              })}
            </div>
          </Scrollbar>
        )}
      </div>
    </div>
  );
};

export default VideoList;
