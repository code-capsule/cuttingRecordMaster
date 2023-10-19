import React, { useEffect, useState } from 'react';
import AudioOptions from './components/AudioOptions';
import EquipmentOptions from './components/EquipmentOptions';
import StartRecording from './components/StartRecording';
import { recordPageActions } from '@common/stores/reduxStore/actions';
const remote = require('@electron/remote');
const screen = remote.screen;
import './index.less';

interface IProps {
  recordingMode: MasterRecordType.TRecordingMode;
}

const RecordingSettings = (props: IProps) => {
  const { recordingMode } = props;
  const [audioMode, setAudioMode] = useState<MasterRecordType.TRecordingAudioMode>(() => {
    return recordingMode === 'camOnly' ? 'micOnly' : 'micAndSystem';
  });
  const [camKey, setCamKey] = useState<string>('1');
  const [micKey, setMicKey] = useState<string>('1');
  const [systemSoundVisible, setSystemSoundVisible] = useState<boolean>(() => {
    return recordingMode !== 'camOnly';
  });
  const [micVisible, setMicVisible] = useState<boolean>(() => {
    return audioMode === 'micAndSystem' || audioMode === 'micOnly';
  });
  const [camVisible, setCamVisible] = useState<boolean>(() => {
    return recordingMode !== 'screenOnly';
  });

  useEffect(() => {
    setMicVisible(audioMode === 'micAndSystem' || audioMode === 'micOnly');
  }, [audioMode]);

  useEffect(() => {
    setCamVisible(audioMode === 'micAndSystem' || audioMode === 'systemOnly');
  }, [audioMode]);

  const handleChangeAudioMode = (audioMode: MasterRecordType.TRecordingAudioMode) => {
    setAudioMode(audioMode);
  };

  const handleChangeCamKey = (camKey: string) => {
    setCamKey(camKey);
  };

  const handleChangeMicKey = (micKey: string) => {
    setMicKey(micKey);
  };

  const handleClickStartRecording = () => {
    const size = screen.getPrimaryDisplay().workAreaSize;
    const recordInstance = window.master?.services?.windowService?.get('record')?.getInstance();
    recordInstance.setSize(size.width, size.height);
    recordInstance.center();
    recordInstance.setAlwaysOnTop(true);
    recordPageActions.updateRecordingMode(recordingMode);
    recordPageActions.updateRecordingAudioMode(audioMode);
    recordPageActions.updateRecordStatus('recording');
  };

  return (
    <div className="recording-settings">
      <div className="recording-settings-content">
        <h2>录制声音选择</h2>
        <AudioOptions systemSoundVisible={systemSoundVisible} audioMode={audioMode} onChangeAudioMode={handleChangeAudioMode} />
        <div className="recording-settings-equipment">
          {micVisible || camVisible ? (
            <>
              <h2>设备选择</h2>
              <EquipmentOptions
                micVisible={micVisible}
                camVisible={camVisible}
                camKey={camKey}
                micKey={micKey}
                onChangeCamKey={handleChangeCamKey}
                onChangeMicKey={handleChangeMicKey}
              />
            </>
          ) : null}
        </div>
        <StartRecording onStartRecording={handleClickStartRecording} />
      </div>
    </div>
  );
};

export default RecordingSettings;
