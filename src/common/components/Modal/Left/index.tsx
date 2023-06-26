import React from 'react';
import './index.less';

interface IProps {
  title?: string;
  children?: any;
}

const ModalLeft = ({ title = '公共弹窗', children }: IProps) => {
  return (
    <div className="common-modal-left">
      <div className="common-modal-title">{title}</div>
      <div className="common-modal-content">{children}</div>
    </div>
  );
};

export default ModalLeft;
