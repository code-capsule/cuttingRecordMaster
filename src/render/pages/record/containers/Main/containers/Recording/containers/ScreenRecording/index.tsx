import React, { useEffect, useState } from 'react';
import ScreenCamera from './components/ScreenCamera';
import ScreenWidget from './components/ScreenWidget';
import { setWindowIgnoreMouseEvent } from '@common/utils/ignoreMouseEvent';
import './index.less';

interface IProps {
  defaultIsShowCam: boolean;
}

const ScreenRecording = (props: IProps) => {
  const { defaultIsShowCam } = props;
  const [isShowCam, setIsShowCam] = useState<boolean>(defaultIsShowCam);

  // useEffect(() => {
  //   console.log('ScreenRecording useEffect');
  //   setWindowIgnoreMouseEvent({ ignore: true });
  //   return () => {
  //     console.log('ScreenRecording useEffect return');
  //     setWindowIgnoreMouseEvent({ ignore: false });
  //   };
  // }, []);

  return <div className="screen-recording">
    {isShowCam && <ScreenCamera />}
    <ScreenWidget />
  </div>;
};

export default ScreenRecording;
