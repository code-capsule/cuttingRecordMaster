import React, { useState } from 'react';
import { ERecordingStep } from '../../constants';
import UnStartHeader from './containers/UnStartHeader';
import RecordingMode from './containers/RecordingMode';
import RecordingSettings from './containers/RecordingSettings';
import { HOME_PROCESS_KEY, RECORD_PROCESS_KEY } from '@src/common/constants/processKey';
import './index.less';

const RecordUnStart = () => {
  const [recordingStep, setRecordingStep] = useState<ERecordingStep>(ERecordingStep.recordingMode);
  const [recordingMode, setRecordingMode] = useState<MasterRecordType.TRecordingMode>('camOnly');

  const handleChangeMode = (mode: MasterRecordType.TRecordingMode) => {
    setRecordingMode(mode);
  };

  const handleClickNextStep = () => {
    setRecordingStep(ERecordingStep.recordingSettings);
  };

  const handleClickChooseRecordingMode = () => {
    setRecordingStep(ERecordingStep.recordingMode);
  };

  const handleClickClose = () =>  {
    const homeWindowInstance = window.master.services.windowService.get(HOME_PROCESS_KEY);
    homeWindowInstance.show();
    const recordWindowInstance = window.master?.services?.windowService?.get(RECORD_PROCESS_KEY);
    recordWindowInstance?.close();
  };

  return (
    <div className="record-un-start">
      <UnStartHeader recordingStep={recordingStep} onChooseRecordingMode={handleClickChooseRecordingMode} onClose={handleClickClose} />
      <div className="record-un-start-content">
        {recordingStep === ERecordingStep.recordingMode ? (
          <RecordingMode recordingMode={recordingMode} onChangeMode={handleChangeMode} onNextStep={handleClickNextStep} />
        ) : (
          <RecordingSettings recordingMode={recordingMode} />
        )}
      </div>
    </div>
  );
};

export default RecordUnStart;
