import React from 'react';
import { useSelector } from 'react-redux';
import '../../index.less';
import RecordingWidget from '@src/render/pages/record/components/RecordingWidget';

const CamOnlyWidget = () => {
  const recordStatus = useSelector((state: MasterAppStoreType.AppState) => state.recordPage.recordStatus);
  const handleClickStop = async () => {
    const res = await window.master.services.recordService.stopRecord();
    console.log('stop record res', res);
  };

  const handleClickPause = () => {
    window.master.services.recordService.pauseRecord();
  };

  const handleClickResume = () => {
    window.master.services.recordService.resumeRecord();
  };

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
