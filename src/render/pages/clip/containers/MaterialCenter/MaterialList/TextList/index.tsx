import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import TextCard from './TextCard';
import Scrollbar from '@src/common/components/ScrollBar';

interface IProps {
  data: MasterResourceType.ITextResource[];
  onInsertMaterial?: (material?: MasterResourceType.ITextResource) => void;
}

const TextList = (props: IProps) => {
  const materialElement = useRef<HTMLDivElement>(null);
  const [materialElementRect, setMaterialElementRect] = useState<DOMRect>();

  useEffect(() => {
    if (materialElement?.current) {
      const rect = materialElement?.current?.getBoundingClientRect();
      setMaterialElementRect(rect);
    }
  }, [materialElement?.current]);

  return (
    <div className="clip-material-text-container">
      <div className="clip-render-text-box" ref={materialElement}>
        {materialElementRect?.height && (
          <Scrollbar maxHeight={materialElementRect.height} y={{ show: true }}>
            <div className="clip-text-scrollbar-list">
              {props?.data?.map((material: MasterResourceType.ITextResource, idx: number) => {
                return (
                  <div key={`${material?.uid}_${idx}`} className="clip-text-scrollbar-item" onClick={() => props?.onInsertMaterial?.(material)}>
                    <TextCard material={material} />
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
