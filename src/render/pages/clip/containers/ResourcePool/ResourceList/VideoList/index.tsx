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
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\哆啦A梦高清壁纸图.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '哆啦A梦自拍.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: false,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\哆啦A梦自拍.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '懒洋洋偷懒高清壁纸.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\懒洋洋偷懒高清壁纸.jpeg',
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
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\海绵宝宝与派大星.jpg',
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
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\蜡笔小新高清剧组照片.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '蜡笔小新大象大象.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\蜡笔小新大象大象.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '名侦探柯南高清剧照.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\名侦探柯南高清剧照.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '海贼王高清剧照图.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\海贼王高清剧照图.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '海贼王乘风破浪.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: false,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\海贼王乘风破浪.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '海绵宝宝高清模板图.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\海绵宝宝高清模板图.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'video',
    size: 20588189,
    name: '名侦探柯南帅气自拍.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: false,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 147.656,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\名侦探柯南帅气自拍.jpg',
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
                    <VideoCard resourceVideo={resource} />
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
