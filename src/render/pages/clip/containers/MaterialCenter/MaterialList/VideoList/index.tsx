import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import VideoCard from './VideoCard';
import Scrollbar from '@src/common/components/ScrollBar';

interface IProps {
  data: MasterResourceType.IVideoResource[];
  onRetryMaterial?: (material?: MasterResourceType.IVideoResource) => void;
  onInsertMaterial?: (material?: MasterResourceType.IVideoResource) => void;
  onDeleteMaterial?: (material?: MasterResourceType.IVideoResource) => void;
}

const VideoList = (props: IProps) => {
  const materialElement = useRef<HTMLDivElement>(null);
  const [materialElementRect, setMaterialElementRect] = useState<DOMRect>();

  useEffect(() => {
    if (materialElement?.current) {
      const rect = materialElement?.current?.getBoundingClientRect();
      setMaterialElementRect(rect);
    }
  }, [materialElement?.current]);

  return (
    <div className="clip-material-video-container">
      <div className="clip-render-video-box" ref={materialElement}>
        {materialElementRect?.height && (
          <Scrollbar maxHeight={materialElementRect.height} y={{ show: true }}>
            <div className="clip-video-scrollbar-list">
              {props?.data?.map((material: MasterResourceType.IVideoResource, idx: number) => {
                return (
                  <div key={`${material?.uid}_${idx}`} className="clip-video-scrollbar-item" onClick={() => props?.onInsertMaterial?.(material)}>
                    <VideoCard material={material} onDeleteMaterial={props?.onDeleteMaterial} onRetryMaterial={props?.onRetryMaterial} />
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
