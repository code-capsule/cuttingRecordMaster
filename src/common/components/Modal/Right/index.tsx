import React from 'react';
import './index.less';
import Scrollbar from '@common/components/ScrollBar';
import { ReactComponent as IcCommonCloseSvg } from '@common/svgs/ic_common_close.svg';

interface IProps {
  onCloseModal?: () => void;
  children?: any;
}

const ModalRight = (props: IProps) => {
  return (
    <div className="common-modal-right">
      <div className="common-modal-close">
        <IcCommonCloseSvg className="svg" onClick={() => props?.onCloseModal?.()} />
      </div>
      <div className="common-modal-content">
        {props?.children && (
          <Scrollbar maxHeight={552} x={{ show: false }} y={{ show: true }}>
            <div className="common-modal-inner-scrollbar">{props?.children}</div>
          </Scrollbar>
        )}
      </div>
    </div>
  );
};

export default ModalRight;
