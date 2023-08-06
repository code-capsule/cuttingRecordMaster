declare namespace MasterRecordType {
  interface IRecordPageInfo {
    recordStatus: TRecordStatus;
    recordingMode: TRecordingMode;
    recordingAudioMode: TRecordingAudioMode;
  }

  type TRecordStatus = 'unStart' | 'recording' | 'pause' | 'stop';

  type TRecordingMode = 'camOnly' | 'screenAndCam' | 'screenOnly';

  type TRecordingAudioMode = 'micAndSystem' | 'systemOnly' | 'micOnly' | 'mute';
}
