import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import Scrollbar from '@src/common/components/ScrollBar';
import ImageCard from './ImageCard';

interface IProps {
  data: MasterResourceType.IImageResource[];
  onInsertMaterial?: (material?: MasterResourceType.IImageResource) => void;
}

const ImageList = (props: IProps) => {
  const resourceElement = useRef<HTMLDivElement>(null);
  const [resourceElementRect, setResourceElementRect] = useState<DOMRect>();

  useEffect(() => {
    if (resourceElement?.current) {
      const rect = resourceElement?.current?.getBoundingClientRect();
      setResourceElementRect(rect);
    }
  }, [resourceElement?.current]);

  return (
    <div className="clip-resource-image-container">
      <div className="clip-render-image-box" ref={resourceElement}>
        {resourceElementRect?.height && (
          <Scrollbar maxHeight={resourceElementRect.height} y={{ show: true }}>
            <div className="clip-image-scrollbar-list">
              {props?.data?.map((resource: MasterResourceType.IImageResource, idx: number) => {
                return (
                  <div key={`${resource?.uid}_${idx}`} className="clip-image-scrollbar-item" onClick={() => props?.onInsertMaterial?.(resource)}>
                    <ImageCard resource={resource} />
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

export default ImageList;
