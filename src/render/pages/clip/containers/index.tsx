import React from 'react';
import './index.less';
import Frame from '@render/pages/clip/components/Frame';
import Header from '@render/pages/clip/containers/Header';

const Main = () => {
  return (
    <div className="clip-main-container">
      <Frame
        renderHeaderComponent={<Header />}
        renderLeftComponent={<div>resource</div>}
        renderCenterComponent={<div>player</div>}
        renderRightComponent={<div>info</div>}
        renderBottomComponent={<div>track</div>}
      />
    </div>
  );
};

export default Main;
