import React, { useState } from 'react';
import ScreenCamera from './components/ScreenCamera';
import ScreenWidget from './components/ScreenWidget';
import './index.less';

interface IProps {
  defaultIsShowCam: boolean;
}

const ScreenRecording = (props: IProps) => {
  const { defaultIsShowCam } = props;
  const [isShowCam, setIsShowCam] = useState<boolean>(defaultIsShowCam);

  return <div className="screen-recording">
    {isShowCam && <ScreenCamera />}
    <ScreenWidget />
  </div>;
};

export default ScreenRecording;
