import React from 'react';
import './index.less';
import Loading, { ILoadingProps } from '@common/components/Loading';

interface IProps extends ILoadingProps {
  style?: React.CSSProperties;
}

const MaskLoading = (props: IProps) => {
  return (
    <div className="common-mask-loading" style={props?.style}>
      <div className="box-loading">
        <Loading size={props?.size} type={props?.type} />
      </div>
    </div>
  );
};

export default MaskLoading;
