import React from 'react';
import Camera from '../../../../components/Camera';
import CamOnlyWidget from './components/CamOnlyWidget';
import './index.less';

const CamOnly = () => {
  return (
    <div className="cam-only">
      <Camera />
      <CamOnlyWidget />
    </div>
  );
};

export default CamOnly;
