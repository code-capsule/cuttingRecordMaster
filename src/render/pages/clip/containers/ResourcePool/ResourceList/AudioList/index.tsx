import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import Scrollbar from '@src/common/components/ScrollBar';
import AudioCard from './AudioCard';

interface IProps {
  data: MasterResourceType.IAudioResource[];
}

const LIST: MasterResourceType.IAudioResource[] = [
  {
    uid: '16911423248780.253',
    type: 'audio',
    size: 20588189,
    name: '名侦探柯南的音效铃声.mp3',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: 'C:\\Users\\user\\Desktop\\名侦探柯南\\名侦探柯南第一集.mp4',
    cover: 'D:\\pdk\\cuttingRecordMaster\\src\\assets\\cloudImage\\哆啦A梦高清壁纸图.jpg',
    data: {
      duration: 15.7,
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
              {LIST.map((resource: MasterResourceType.IAudioResource, idx: number) => {
                return (
                  <div key={`${resource?.uid}_${idx}`} className="clip-audio-scrollbar-item">
                    <AudioCard resource={resource} />
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
