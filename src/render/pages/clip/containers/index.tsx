import React from 'react';
import './index.less';
import Frame from '@render/pages/clip/components/Frame';
import Header from '@render/pages/clip/containers/Header';
import MaterialCenter from '@render/pages/clip/containers/MaterialCenter';

const Main = () => {
  return (
    <div className="clip-main-container">
      <Frame
        renderHeaderComponent={<Header />}
        renderLeftComponent={<MaterialCenter />}
        renderCenterComponent={<div>player</div>}
        renderRightComponent={<div>info</div>}
        renderBottomComponent={<div>track</div>}
      />
    </div>
  );
};

export default Main;
