import React from 'react';
import { ReactComponent as CloseIcon } from '@render/pages/record/assets/un_start_close.svg';
import { ReactComponent as ReturnIcon } from '@render/pages/record/assets/un_start_return.svg';
import { RECORDING_STEP } from '../../../../constants';
import './index.less';

interface IProps {
  recordingStep: RECORDING_STEP;
  onChooseRecordingMode: () => void;
}

const UnStartHeader = (props: IProps) => {
  const { recordingStep, onChooseRecordingMode } = props;

  const ChooseRecordingMode = () => {
    return (
      <div className="choose-recording-mode-btn" onClick={() => onChooseRecordingMode()}>
        <ReturnIcon />
        <span>上一步</span>
      </div>
    );
  };

  const CloseRecording = () => {
    return <div className="un-start-close">
      <CloseIcon />
    </div>;
  };

  return (
    <div className="un-start-header">
      { recordingStep === RECORDING_STEP.recordingSettings ? <ChooseRecordingMode /> : null }
      <CloseRecording />
    </div>
  );
};

export default UnStartHeader;
