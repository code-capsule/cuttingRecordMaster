import React from 'react';
import Card from '../../../../../../components/Card';
import { ReactComponent as MicAndSystemIcon } from '@render/pages/record/assets/mic_and_system.svg';
import { ReactComponent as SystemOnlyIcon } from '@render/pages/record/assets/system_only.svg';
import { ReactComponent as MicOnlyIcon } from '@render/pages/record/assets/mic_only.svg';
import { ReactComponent as MuteIcon } from '@render/pages/record/assets/mute.svg';
import { RECORDING_AUDIO_MODE } from '../../../../../../constants';
import './index.less';

interface IProps {
  audioMode: RECORDING_AUDIO_MODE;
  systemSoundVisible?: boolean;
  onChangeAudioMode: (audioMode: RECORDING_AUDIO_MODE) => void;
}

const AudioOptions = (props: IProps) => {
  const { audioMode, systemSoundVisible = true, onChangeAudioMode } = props;

  const renderMicAndSystemIcon = () => {
    return <MicAndSystemIcon width={20} height={20} style={{ 'marginRight': '8px' }} />;
  };

  const renderSystemOnlyIcon = () => {
    return <SystemOnlyIcon width={20} height={20} style={{ 'marginRight': '8px' }} />;
  };

  const renderMicOnlyIcon = () => {
    return <MicOnlyIcon width={20} height={20} style={{ 'marginRight': '8px' }} />;
  };

  const renderMuteIcon = () => {
    return <MuteIcon width={20} height={20} style={{ 'marginRight': '8px' }} />;
  };

  const handleClickCard = (audioMode: RECORDING_AUDIO_MODE) => {
    onChangeAudioMode(audioMode);
  };

  const renderSystemSoundOptions = () => {
    return (
      <>
        <div className="audio-recording-option">
          <Card Icon={renderMicAndSystemIcon} selected={audioMode === RECORDING_AUDIO_MODE.micAndSystem} text="麦克风 + 系统声音" onClick={() => handleClickCard(RECORDING_AUDIO_MODE.micAndSystem)}></Card>
        </div>
        <div className="audio-recording-option">
          <Card Icon={renderSystemOnlyIcon} selected={audioMode === RECORDING_AUDIO_MODE.systemOnly} text="系统声音" onClick={() => handleClickCard(RECORDING_AUDIO_MODE.systemOnly)}></Card>
        </div>
      </>
    );
  };

  return (
    <div className="audio-recording-options">
      { systemSoundVisible ? renderSystemSoundOptions() : null }
      <div className="audio-recording-option">
        <Card Icon={renderMicOnlyIcon} selected={audioMode === RECORDING_AUDIO_MODE.micOnly} text="麦克风" onClick={() => handleClickCard(RECORDING_AUDIO_MODE.micOnly)}></Card>
      </div>
      <div className="audio-recording-option">
        <Card Icon={renderMuteIcon} selected={audioMode === RECORDING_AUDIO_MODE.mute} text="静音" onClick={() => handleClickCard(RECORDING_AUDIO_MODE.mute)}></Card>
      </div>
    </div>
  );
};

export default AudioOptions;