import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import Scrollbar from '@src/common/components/ScrollBar';
import TextCard from './TextCard';

interface IProps {
  data: MasterResourceType.ITextResource[];
}

const TextList = (props: IProps) => {
  const resourceElement = useRef<HTMLDivElement>(null);
  const [resourceElementRect, setResourceElementRect] = useState<DOMRect>();

  useEffect(() => {
    if (resourceElement?.current) {
      const rect = resourceElement?.current?.getBoundingClientRect();
      setResourceElementRect(rect);
    }
  }, [resourceElement?.current]);

  return (
    <div className="clip-resource-text-container">
      <div className="clip-render-text-box" ref={resourceElement}>
        {resourceElementRect?.height && (
          <Scrollbar maxHeight={resourceElementRect.height} y={{ show: true }}>
            <div className="clip-text-scrollbar-list">
              {props?.data?.map((resource: MasterResourceType.ITextResource, idx: number) => {
                return (
                  <div key={`${resource?.uid}_${idx}`} className="clip-text-scrollbar-item">
                    <TextCard resource={resource} />
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

export default TextList;
