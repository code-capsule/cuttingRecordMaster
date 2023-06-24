import { ISelectItem } from '@render/pages/record/containers/RecordMain/components/Select';

export enum RECORDING_STEP {
  'recordingMode' = 'recordingMode',
  'recordingSettings' = 'recordingSettings',
}

export enum RECORDING_MODE {
  'camOnly' = 'camOnly',
  'screenAndCam' = 'screenAndCam',
  'screenOnly' = 'screenOnly',
}

export enum RECORDING_AUDIO_MODE {
  'micAndSystem' = 'micAndSystem',
  'systemOnly' = 'systemOnly',
  'micOnly' = 'micOnly',
  'mute' = 'mute',
}

export const AUDIO_RECORDING_OPTIONS = [
  {
    key: '1',
    value: '麦克风 + 系统声音',
  },
  {
    key: '2',
    value: '麦克风',
  },
  {
    key: '3',
    value: '系统声音',
  },
  {
    key: '4',
    value: '静音',
  }
];

export const EQUIPMENT_OPTIONS = [
  {
    key: '1',
    value: '麦克风',
  },
  {
    key: '2',
    value: '摄像头',
  }
];

export const MIC_OPTIONS: ISelectItem[] = [
  {
    key: '1',
    value: '默认 - MacBook Pro 麦克风 (Built-in)',
  },
  {
    key: '2',
    value: 'MacBook Pro 麦克风 (Built-in)',
  },
  {
    key: '3',
    value: 'WeMeet Audio Device (Virtual)',
  },
  {
    key: '4',
    value: 'Aunboxsoft Audio Device (Virtual)',
  },
  {
    key: '5',
    value: 'Aunboxsoft Audio Device (UI Sounds) (Virtual)',
  }
];

export const CAM_OPTIONS: ISelectItem[] = [
  {
    key: '1',
    value: 'FaceTime HD Camera (05ac:8514)'
  }
];