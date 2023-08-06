import React from 'react';
import { useSelector } from 'react-redux';
import '../../index.less';
import RecordingWidget from '@render/pages/record/containers/Main/components/RecordingWidget';

const CamOnlyWidget = () => {
  const recordStatus = useSelector((state: MasterAppStoreType.AppState) => state.recordPage.recordStatus);
  const handleClickStop = () => {};

  const handleClickPause = () => {};

  const handleClickResume = () => {};

  return (
    <div className="cam-only-widget">
      <div className="cam-only-recording-widget">
        <RecordingWidget
          recordStatus={recordStatus}
          time={23}
          onClickStop={handleClickStop}
          onClickPause={handleClickPause}
          onClickResume={handleClickResume}
        />
      </div>
    </div>
  );
};

export default CamOnlyWidget;
