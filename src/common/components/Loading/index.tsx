import React, { useState, useEffect, useRef } from 'react';
import './index.less';

export interface ILoadingProps {
  className?: string;
  size?: number;
  type?: 'white' | 'grey';
  style?: React.CSSProperties;
}

const Loading = (props: ILoadingProps) => {
  const [deg, setDeg] = useState(0);
  const timer = useRef<NodeJS.Timer>();

  const rotate = () => {
    setDeg((_deg) => (_deg === 360 ? 45 : _deg + 45));
    timer.current = setTimeout(() => {
      rotate();
    }, 100);
  };

  useEffect(() => {
    rotate();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      className={`loading ${props?.className} ${props?.type === 'grey' ? 'grey-loading' : 'white-loading'}`}
      style={{
        transform: `rotate(${deg}deg)`,
        width: props?.size || 48,
        height: props?.size || 48,
        ...props?.style,
      }}
    />
  );
};

export default Loading;
