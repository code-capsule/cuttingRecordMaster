import React from 'react';
import { RECORDING_MODE } from '../../../../constants';
import { ReactComponent as NextStepIcon } from '@render/pages/record/assets/next_step.svg';
import CamBg from '@render/pages/record/assets/cam_bg.png';
import ScreenAndCamBg from '@render/pages/record/assets/screen_cam_bg.png';
import ScreenBg from '@render/pages/record/assets/screen_bg.png';
import './index.less';

interface IProps {
  recordingMode: RECORDING_MODE;
  onChangeMode: (mode: RECORDING_MODE) => void;
  onNextStep: () => void;
}

const RECORDING_MODE_OPTIONS = [
  { key: RECORDING_MODE.camOnly, title: '仅人像', imgUrl: CamBg },
  { key: RECORDING_MODE.screenAndCam, title: '人像 + 屏幕', imgUrl: ScreenAndCamBg },
  { key: RECORDING_MODE.screenOnly, title: '仅屏幕', imgUrl: ScreenBg },
];

const RecordingMode = (props: IProps) => {
  const { recordingMode, onChangeMode, onNextStep } = props;

  return (
    <div className="recording-mode">
      <div className="recording-mode-title">请选择录制模式</div>
      <div className="recording-mode-options">
        {RECORDING_MODE_OPTIONS.map(option => {
          return (
            <div className={`recording-mode-select-item ${recordingMode === option.key ? 'active' : ''}`} key={option.key} onClick={() => onChangeMode(option.key)}>
              <div className="recording-mode-select-item-img">
                <img src={option.imgUrl} />
              </div>
              <span className="recording-mode-select-item-title">
                { option.title }
              </span>
            </div>
          );
        })}
      </div>
      <div className="recording-next-step">
        <div className="recording-next-step-btn" onClick={onNextStep}>
          下一步
          <NextStepIcon width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default RecordingMode;
