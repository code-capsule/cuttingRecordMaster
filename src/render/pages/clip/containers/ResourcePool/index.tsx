import React, { useState, createContext } from 'react';
import './index.less';
import { EResourceFromType, EResourceType } from '@src/typings/resource/enum';
import ResourceTab from './ResourceTab';
import ResourceSidebar from './ResourceSidebar';

export interface ResourceContextProps {
  tabType?: EResourceFromType;
  sidebarType?: EResourceType;
  updateTabType?: (type: EResourceFromType) => void;
  updateSidebarType?: (type: EResourceType) => void;
}

export const ResourcePoolContext = createContext<ResourceContextProps>({});

const ResourcePool = () => {
  const [tabType, setTabType] = useState<EResourceFromType>(EResourceFromType.local);
  const [sidebarType, setSidebarType] = useState<EResourceType>(EResourceType.video);

  const resourceContextReducer: ResourceContextProps = {
    tabType,
    sidebarType,
    updateTabType: (type: EResourceFromType) => setTabType(type),
    updateSidebarType: (type: EResourceType) => setSidebarType(type),
  };

  return (
    <ResourcePoolContext.Provider value={resourceContextReducer}>
      <div className="clip-resource-pool-container">
        <ResourceSidebar />
        <div className="clip-resource-pool-fill-line" />
        <div className="clip-resource-pool-content-container">
          <ResourceTab />
        </div>
      </div>
    </ResourcePoolContext.Provider>
  );
};

export default ResourcePool;
