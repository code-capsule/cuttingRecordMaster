import React from 'react';
import { useSelector } from 'react-redux';
import RecordingWidget from '@src/render/pages/record/components/RecordingWidget';
import useSetIgnoreMouseEvent from '@common/hooks/useSetIgnoreMouseEvent';
import './index.less';

const ScreenWidget = () => {
  const recordStatus = useSelector((state: MasterAppStoreType.AppState) => state.recordPage.recordStatus);
  const recordingWidgetRef = React.useRef<HTMLDivElement | null>(null);

  useSetIgnoreMouseEvent({ ignoreElementRef: recordingWidgetRef });

  const handleClickStop = () => {
    const recordInstance = window.master?.services?.windowService?.get('record')?.getInstance();
    recordInstance.setSize(880, 466);
    recordInstance.center();
    recordInstance.setAlwaysOnTop(false);
  };

  const handleClickPause = () => {};

  const handleClickResume = () => {};
  return <div className="screen-widget">
    <div ref={recordingWidgetRef} className="screen-recording-widget">
      <RecordingWidget
        recordStatus={recordStatus}
        time={23}
        onClickStop={handleClickStop}
        onClickPause={handleClickPause}
        onClickResume={handleClickResume}
      />
    </div>
  </div>;
};

export default ScreenWidget;
