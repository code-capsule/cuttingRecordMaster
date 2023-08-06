import React, { useEffect, useState } from 'react';
import AudioOptions from './components/AudioOptions';
import EquipmentOptions from './components/EquipmentOptions';
import StartRecording from './components/StartRecording';
import { recordPageActions } from '@common/stores/reduxStore/actions';
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
    return audioMode !== 'mute';
  });
  const [camVisible, setCamVisible] = useState<boolean>(() => {
    return recordingMode !== 'screenOnly';
  });

  useEffect(() => {
    setMicVisible(audioMode !== 'mute');
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
