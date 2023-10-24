import React from 'react';
import './index.less';
import Loading from '@common/components/Loading';

interface IProps {
  style?: React.CSSProperties;
  mask?: boolean;
  loadingSize?: number;
}

const FullScreenLoading = (props: IProps) => {
  return (
    <div className={`common-fullscreen-loading ${props?.mask ? 'common-mask-loading' : ''}`} style={props?.style}>
      <div className="box-loading">
        <Loading size={props?.loadingSize ||  32} type={props?.mask ? 'white' : 'grey'} />
      </div>
    </div>
  );
};

export default FullScreenLoading;
