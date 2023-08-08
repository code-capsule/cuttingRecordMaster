import React from 'react';
import CamOnly from './containers/CamOnly';
import ScreenRecording from './containers/ScreenRecording';
import { useSelector } from 'react-redux';
import './index.less';

const Recording = () => {
  const recordingMode = useSelector((state: MasterAppStoreType.AppState) => state.recordPage.recordingMode);

  const renderRecordingPage = () => {
    switch (recordingMode) {
      case 'camOnly':
        return <CamOnly />;
      case 'screenAndCam':
      case 'screenOnly':
        return <ScreenRecording defaultIsShowCam={recordingMode === 'screenAndCam'} />;
      default:
        return <CamOnly />;
    }
  };

  return (
    <div className="recording">
      {renderRecordingPage()}
    </div>
  );
};

export default Recording;
