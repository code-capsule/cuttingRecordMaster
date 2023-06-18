import React from 'react';
import { RECORDING_MODE } from '../../../../constants';
import './index.less';

interface IProps {
  recordingMode: RECORDING_MODE;
  onChooseRecordingMode: () => void;
}

const RecordingSettings = (props: IProps) => {
  return (
    <div className="recording-settings">
    </div>
  );
};

export default RecordingSettings;
