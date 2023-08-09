import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import Scrollbar from '@src/common/components/ScrollBar';
import AudioCard from './AudioCard';

interface IProps {
  data: MasterResourceType.IVideoResource[];
}

const LIST: MasterResourceType.IVideoResource[] = [
  {
    uid: '16911423248780.253',
    type: 'audio',
    size: 20588189,
    name: '名侦探柯南的音效铃声.mp3',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 15.7,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\哆啦A梦高清壁纸图.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'audio',
    size: 20588189,
    name: '大话西游出场音效.mp3',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    data: {
      resolutionWidth: 1000,
      resolutionHeight: 418,
      duration: 212.2,
      startTime: 0,
      inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\哆啦A梦自拍.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'audio',
    size: 20588189,
    name: '快节奏动感抖音音效.mp3',
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
    type: 'audio',
    size: 20588189,
    name: '抖音卡点神曲BGM.mp3',
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
    type: 'audio',
    size: 20588189,
    name: '抖音热曲带我去找夜生活.mp3',
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
    type: 'audio',
    size: 20588189,
    name: '抖音热曲心墙DJ.mp3',
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
    type: 'audio',
    size: 20588189,
    name: '抖音热曲给你一瓶魔法药水.mp3',
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
    type: 'audio',
    size: 20588189,
    name: '抖音热门世界杯BGM.mp3',
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
    type: 'audio',
    size: 20588189,
    name: '节奏开场.mp3',
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
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\海贼王乘风破浪.jpg',
      thumbnails: [],
    },
  },
  {
    uid: '16911423248780.253',
    type: 'audio',
    size: 20588189,
    name: '观众哄笑抽气音效.mp3',
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
    type: 'audio',
    size: 20588189,
    name: '轻松的搞笑氛围音.mp3',
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
      cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\名侦探柯南帅气自拍.jpg',
      thumbnails: [],
    },
  },
];

const AudioList = (props: IProps) => {
  const resourceElement = useRef<HTMLDivElement>(null);
  const [resourceElementRect, setResourceElementRect] = useState<DOMRect>();

  useEffect(() => {
    if (resourceElement?.current) {
      const rect = resourceElement?.current?.getBoundingClientRect();
      setResourceElementRect(rect);
    }
  }, [resourceElement?.current]);

  return (
    <div className="clip-resource-audio-container">
      <div className="clip-render-audio-box" ref={resourceElement}>
        {resourceElementRect?.height && (
          <Scrollbar maxHeight={resourceElementRect.height} y={{ show: true }}>
            <div className="clip-audio-scrollbar-list">
              {[...LIST, ...LIST].map((resource: MasterResourceType.IVideoResource, idx: number) => {
                return (
                  <div key={`${resource?.uid}_${idx}`} className="clip-audio-scrollbar-item">
                    <AudioCard resourceVideo={resource} />
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

export default AudioList;
