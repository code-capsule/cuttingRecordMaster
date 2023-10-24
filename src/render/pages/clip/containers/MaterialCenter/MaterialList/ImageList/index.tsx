import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import ImageCard from './ImageCard';
import Scrollbar from '@src/common/components/ScrollBar';

interface IProps {
  data: MasterResourceType.IImageResource[];
  onInsertMaterial?: (material?: MasterResourceType.IImageResource) => void;
}

const ImageList = (props: IProps) => {
  const materialElement = useRef<HTMLDivElement>(null);
  const [materialElementRect, setMaterialElementRect] = useState<DOMRect>();

  useEffect(() => {
    if (materialElement?.current) {
      const rect = materialElement?.current?.getBoundingClientRect();
      setMaterialElementRect(rect);
    }
  }, [materialElement?.current]);

  return (
    <div className="clip-material-image-container">
      <div className="clip-render-image-box" ref={materialElement}>
        {materialElementRect?.height && (
          <Scrollbar maxHeight={materialElementRect.height} y={{ show: true }}>
            <div className="clip-image-scrollbar-list">
              {props?.data?.map((material: MasterResourceType.IImageResource, idx: number) => {
                return (
                  <div key={`${material?.uid}_${idx}`} className="clip-image-scrollbar-item" onClick={() => props?.onInsertMaterial?.(material)}>
                    <ImageCard material={material} />
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
