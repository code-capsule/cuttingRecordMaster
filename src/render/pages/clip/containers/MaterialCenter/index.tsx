import React, { useState, createContext } from 'react';
import './index.less';
import { EResourceType } from '@src/typings/resource/enum';
import Sidebar from './Sidebar';
import MaterialList from './MaterialList';

export interface MaterialContextProps {
  sidebarType?: EResourceType;
  updateSidebarType?: (type: EResourceType) => void;
}

export const MaterialCenterContext = createContext<MaterialContextProps>({});

const MaterialCenter = () => {
  const [sidebarType, setSidebarType] = useState<EResourceType>(EResourceType.video);

  const materialContextReducer: MaterialContextProps = {
    sidebarType,
    updateSidebarType: (type: EResourceType) => setSidebarType(type),
  };

  return (
    <MaterialCenterContext.Provider value={materialContextReducer}>
      <div className="clip-material-pool-container">
        <div className="clip-material-pool-sidebar-container">
          <Sidebar />
        </div>
        <div className="clip-material-pool-fill-container" />
        <div className="clip-material-pool-content-container">
          <MaterialList />
        </div>
      </div>
    </MaterialCenterContext.Provider>
  );
};

export default MaterialCenter;
