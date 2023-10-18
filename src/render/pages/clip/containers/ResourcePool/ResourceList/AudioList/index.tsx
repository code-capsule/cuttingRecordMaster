import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import Scrollbar from '@src/common/components/ScrollBar';
import AudioCard from './AudioCard';

interface IProps {
  data: MasterResourceType.IAudioResource[];
}

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
              {props?.data?.map((resource: MasterResourceType.IAudioResource, idx: number) => {
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
