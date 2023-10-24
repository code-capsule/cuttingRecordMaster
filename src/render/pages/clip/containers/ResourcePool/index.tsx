import React, { useState, createContext } from 'react';
import './index.less';
import { EResourceType } from '@src/typings/resource/enum';
import ResourceList from './ResourceList';
import ResourceSidebar from './ResourceSidebar';

export interface ResourceContextProps {
  sidebarType?: EResourceType;
  updateSidebarType?: (type: EResourceType) => void;
}

export const ResourcePoolContext = createContext<ResourceContextProps>({});

const ResourcePool = () => {
  const [sidebarType, setSidebarType] = useState<EResourceType>(EResourceType.video);

  const resourceContextReducer: ResourceContextProps = {
    sidebarType,
    updateSidebarType: (type: EResourceType) => setSidebarType(type),
  };

  return (
    <ResourcePoolContext.Provider value={resourceContextReducer}>
      <div className="clip-resource-pool-container">
        <div className="clip-resource-pool-sidebar-container">
          <ResourceSidebar />
        </div>
        <div className="clip-resource-pool-fill-container" />
        <div className="clip-resource-pool-content-container">
          <ResourceList />
        </div>
      </div>
    </ResourcePoolContext.Provider>
  );
};

export default ResourcePool;
