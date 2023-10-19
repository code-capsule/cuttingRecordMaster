import React from 'react';
import { ReactComponent as StartRecordingIcon } from '@render/pages/record/assets/start_record.svg';
import './index.less';

interface IProps {
  onStartRecording: () => void;
}

const StartRecording = (props: IProps) => {
  const { onStartRecording } = props;

  return (
    <div className="start-recording" onClick={onStartRecording}>
      <div className="start-recording-btn">
        <StartRecordingIcon width={20} height={20} />
        开始录制
      </div>
    </div>
  );
};

export default StartRecording;