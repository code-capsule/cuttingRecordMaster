import React from 'react';
import { ReactComponent as StartRecordingIcon } from '@render/pages/record/assets/start_record.svg';
import './index.less';

interface IProps {

}

const StartRecording = (props: IProps) => {

  return (
    <div className="start-recording">
      <div className="start-recording-btn">
        <StartRecordingIcon width={20} height={20} />
        开始录制
      </div>
    </div>
  );
};

export default StartRecording;