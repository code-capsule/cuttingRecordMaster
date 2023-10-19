import React from 'react';
import { ReactComponent as ResumeIcon } from '@render/pages/record/assets/resume.svg';
import { ReactComponent as PauseIcon } from '@render/pages/record/assets/pause.svg';
import { recordPageActions } from '@src/common/stores/reduxStore/actions';
import './index.less';

interface IProps {
  time: number;
  recordStatus: MasterRecordType.TRecordStatus;
  onClickStop: () => void;
  onClickPause: () => void;
  onClickResume: () => void;
}

const RecordingWidget = (props: IProps) => {
  const { time, recordStatus, onClickStop, onClickPause, onClickResume } = props;

  const handleClickStop = () => {
    recordPageActions.updateRecordStatus('unStart');
    onClickStop();
  };

  return (
    <div className="recording-widget">
      <div className="widget-item recording-timer">{time}</div>
      <div className="widget-item stop-recording" onClick={handleClickStop}>
        <div className="border"></div>
        <div className="content"></div>
      </div>
      <div className="widget-item pause-recording">
        {recordStatus === 'recording' ? <PauseIcon width={20} onClick={onClickPause} /> : <ResumeIcon width={28} onClick={onClickResume} />}
      </div>
    </div>
  );
};

export default RecordingWidget;
