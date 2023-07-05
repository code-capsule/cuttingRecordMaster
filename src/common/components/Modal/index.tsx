import React from 'react';
import './index.less';

interface IModalProps {
  children?: any;
}

const Modal = React.memo((props: IModalProps) => {
  return (
    <div
      className="common-modal"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
      }}
    >
      <div className="common-content">
        {props?.children}
      </div>
    </div>
  );
});

export default Modal;
