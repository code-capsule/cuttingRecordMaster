import React from 'react';
import './index.less';

interface IProps {
  /**
   * @description 渲染头部
   */
  renderHeaderComponent?: React.ReactNode;
  /**
   * @description 渲染内容左侧
   */
  renderLeftComponent?: React.ReactNode;
  /**
   * @description 渲染内容中间
   */
  renderCenterComponent?: React.ReactNode;
  /**
   * @description 渲染内容右侧
   */
  renderRightComponent?: React.ReactNode;
  /**
   * @description 渲染内容底部
   */
  renderBottomComponent?: React.ReactNode;
}

const Frame = React.memo((props: IProps) => {
  return (
    <div className="clip-frame-layout" id="clip-frame-layout">
      <div className="clip-frame-header" id="clip-frame-header">
        {props?.renderHeaderComponent}
      </div>
      <div className="clip-frame-content" id="clip-frame-content">
        <div className="clip-content-left" id="clip-content-left">
          {props?.renderLeftComponent}
        </div>
        <div className="clip-content-center" id="clip-content-center">
          {props?.renderCenterComponent}
        </div>
        <div className="clip-content-right" id="clip-content-right">
          {props?.renderRightComponent}
        </div>
      </div>
      <div className="clip-frame-bottom" id="clip-frame-bottom">
        {props?.renderBottomComponent}
      </div>
    </div>
  );
});

export default Frame;
