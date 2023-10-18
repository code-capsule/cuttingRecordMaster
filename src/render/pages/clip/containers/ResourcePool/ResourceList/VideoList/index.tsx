import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import Scrollbar from '@src/common/components/ScrollBar';
import VideoCard from './VideoCard';

interface IProps {
  data: MasterResourceType.IVideoResource[];
}

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
              {props?.data?.map((resource: MasterResourceType.IVideoResource, idx: number) => {
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
