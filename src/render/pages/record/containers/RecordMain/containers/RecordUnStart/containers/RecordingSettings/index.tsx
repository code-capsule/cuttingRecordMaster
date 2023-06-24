import React, { useEffect, useState } from 'react';
import { RECORDING_MODE, RECORDING_AUDIO_MODE } from '../../../../constants';
import AudioOptions from './components/AudioOptions';
import EquipmentOptions from './components/EquipmentOptions';
import StartRecording from './components/StartRecording';
import './index.less';

interface IProps {
  recordingMode: RECORDING_MODE;
}

const RecordingSettings = (props: IProps) => {
  const { recordingMode } = props;
  const [audioMode, setAudioMode] = useState<RECORDING_AUDIO_MODE>(RECORDING_AUDIO_MODE.micAndSystem);
  const [camKey, setCamKey] = useState<string>('1');
  const [micKey, setMicKey] = useState<string>('1');
  const [systemSoundVisible, setSystemSoundVisible] = useState<boolean>(() => {
    return recordingMode !== RECORDING_MODE.camOnly;
  });
  const [camVisible, setCamVisible] = useState<boolean>(() => {
    return recordingMode !== RECORDING_MODE.screenOnly;
  });

  useEffect(() => {
    setCamVisible(audioMode === RECORDING_AUDIO_MODE.micAndSystem || audioMode === RECORDING_AUDIO_MODE.systemOnly);
  }, [audioMode]);

  const handleChangeAudioMode = (audioMode: RECORDING_AUDIO_MODE) => {
    setAudioMode(audioMode);
  };

  const handleChangeCamKey = (camKey: string) => {
    setCamKey(camKey);
  };

  const handleChangeMicKey = (micKey: string) => {
    setMicKey(micKey);
  };

  return (
    <div className="recording-settings">
      <div className="recording-settings-content">
        <h2>录制声音选择</h2>
        <AudioOptions systemSoundVisible={systemSoundVisible} audioMode={audioMode} onChangeAudioMode={handleChangeAudioMode} />
        <>
          <h2>设备选择</h2>
          <EquipmentOptions camVisible={camVisible} camKey={camKey} micKey={micKey} onChangeCamKey={handleChangeCamKey} onChangeMicKey={handleChangeMicKey} />
        </>
        <StartRecording />
      </div>
    </div>
  );
};

export default RecordingSettings;
