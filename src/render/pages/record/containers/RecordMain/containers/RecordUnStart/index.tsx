import React, { useState } from 'react';
import { RECORDING_MODE, RECORDING_STEP } from '../../constants';
import UnStartHeader from './containers/UnStartHeader';
import RecordingMode from './containers/RecordingMode';
import RecordingSettings from './containers/RecordingSettings';
import './index.less';

const RecordUnStart = () => {
  const [recordingStep, setRecordingStep] = useState<RECORDING_STEP>(RECORDING_STEP.recordingMode);
  const [recordingMode, setRecordingMode] = useState<RECORDING_MODE>(RECORDING_MODE.screenAndCam);

  const handleChangeMode = (mode: RECORDING_MODE) => {
    setRecordingMode(mode);
  };

  const handleClickNextStep = () => {
    setRecordingStep(RECORDING_STEP.recordingSettings);
  };

  const handleClickChooseRecordingMode = () => {
    setRecordingStep(RECORDING_STEP.recordingMode);
  };

  return (
    <div className="record-un-start">
      <UnStartHeader recordingStep={recordingStep} onChooseRecordingMode={handleClickChooseRecordingMode} />
      <div className="record-un-start-content">
        {recordingStep === RECORDING_STEP.recordingMode ? (
          <RecordingMode recordingMode={recordingMode} onChangeMode={handleChangeMode} onNextStep={handleClickNextStep} />
        ) : (
          <RecordingSettings recordingMode={recordingMode} onChooseRecordingMode={handleClickChooseRecordingMode} />
        )}
      </div>
    </div>
  );
};

export default RecordUnStart;
