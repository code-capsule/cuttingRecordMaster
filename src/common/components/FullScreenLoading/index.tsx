import React from 'react';
import './index.less';
import Loading, { ILoadingProps } from '@common/components/Loading';

interface IProps extends ILoadingProps {
  style?: React.CSSProperties;
}

const FullScreenLoading = (props: IProps) => {
  return (
    <div className="common-fullscreen-loading" style={props?.style}>
      <div className="box-loading">
        <Loading size={props?.size} type={props?.type} />
      </div>
    </div>
  );
};

export default FullScreenLoading;
