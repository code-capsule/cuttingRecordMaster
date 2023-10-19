import React, { useContext } from 'react';
import './index.less';
import { EResourceFromType } from '@src/typings/resource/enum';
import { ResourcePoolContext, ResourceContextProps } from '@render/pages/clip/containers/ResourcePool';

const ResourceTab = () => {
  const resourceContextReducer = useContext<ResourceContextProps>(ResourcePoolContext);

  return (
    <div className="clip-resource-tab">
      <div
        className={`clip-resource-tab-item ${resourceContextReducer?.tabType === EResourceFromType.cloud ? 'active' : ''}`}
        onClick={() => resourceContextReducer?.updateTabType?.(EResourceFromType.cloud)}
      >
        云素材
      </div>
      <div
        className={`clip-resource-tab-item ${resourceContextReducer?.tabType === EResourceFromType.local ? 'active' : ''}`}
        onClick={() => resourceContextReducer?.updateTabType?.(EResourceFromType.local)}
      >
        本地素材
      </div>
    </div>
  );
};

export default ResourceTab;
