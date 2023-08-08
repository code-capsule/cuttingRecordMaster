import React from 'react';
import { useSelector } from 'react-redux';
import RecordingWidget from '@render/pages/record/containers/Main/components/RecordingWidget';
import useSetIgnoreMouseEvent from '@common/hooks/useSetIgnoreMouseEvent';
import { setWindowIgnoreMouseEvent } from '@common/utils/ignoreMouseEvent';
import './index.less';

const ScreenWidget = () => {
  const recordStatus = useSelector((state: MasterAppStoreType.AppState) => state.recordPage.recordStatus);
  const recordingWidgetRef = React.useRef<HTMLDivElement | null>(null);

  useSetIgnoreMouseEvent({ ignoreElementRef: recordingWidgetRef.current });

  const handleClickStop = () => {
    setWindowIgnoreMouseEvent({ ignore: false });
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
