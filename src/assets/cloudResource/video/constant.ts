import { EResourceType } from '@typings/resource/enum';
import path from 'path';

const cloudVideoFilePath = `${window?.master?.appRootPath || ''}\\src\\assets\\cloudResource\\video`;

const CLOUD_RESOURCE_AUDIO_LIST: MasterResourceType.IVideoResource[] = [
  {
    uid: 'cloud.video.resource.001',
    cloudRemoteUid: 'cloud.video.resource.001',
    cloudRemoteUrl: '',
    type: EResourceType.video,
    size: 2569224,
    name: '复古风格素材.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: path.join(cloudVideoFilePath, '\\复古风格素材.mp4'),
    cover: path.join(cloudVideoFilePath, '\\复古风格素材.jpg'),
    data: {
      resolutionHeight: 1080,
      resolutionWidth: 1920,
      duration: 6.409,
      startTime: 0,
      thumbnails: [],
      videoExpandedInfo: {
        codec_name: 'h264',
        avg_frame_rate: '30/1',
      },
      audioExpandedInfo: {
        codec_name: 'aac',
        sample_rate: 44100,
      },
    },
  },
  {
    uid: 'cloud.video.resource.002',
    cloudRemoteUid: 'cloud.video.resource.002',
    cloudRemoteUrl: '',
    type: EResourceType.video,
    size: 1583308,
    name: '转场nice大叔.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: path.join(cloudVideoFilePath, '\\转场nice大叔.mp4'),
    cover: path.join(cloudVideoFilePath, '\\转场nice大叔.jpg'),
    data: {
      resolutionHeight: 1080,
      resolutionWidth: 1920,
      duration: 2.276,
      startTime: 0,
      thumbnails: [],
      videoExpandedInfo: {
        codec_name: 'h264',
        avg_frame_rate: '30/1',
      },
      audioExpandedInfo: {
        codec_name: 'aac',
        sample_rate: 44100,
      },
    },
  },
  {
    uid: 'cloud.video.resource.003',
    cloudRemoteUid: 'cloud.video.resource.003',
    cloudRemoteUrl: '',
    type: EResourceType.video,
    size: 1583308,
    name: '转场哈哈大笑素材库.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: path.join(cloudVideoFilePath, '\\转场哈哈大笑素材库.mp4'),
    cover: path.join(cloudVideoFilePath, '\\转场哈哈大笑素材库.jpg'),
    data: {
      resolutionHeight: 1080,
      resolutionWidth: 1920,
      duration: 2.09,
      startTime: 0,
      thumbnails: [],
      videoExpandedInfo: {
        codec_name: 'h264',
        avg_frame_rate: '30/1',
      },
      audioExpandedInfo: {
        codec_name: 'aac',
        sample_rate: 44100,
      },
    },
  },
  {
    uid: 'cloud.video.resource.004',
    cloudRemoteUid: 'cloud.video.resource.004',
    cloudRemoteUrl: '',
    type: EResourceType.video,
    size: 1806509,
    name: '扶额无语转场素材视频.mp4',
    visible: true,
    createTime: 1691142324878,
    updateTime: 1691142324878,
    isExistResource: true,
    inputPath: path.join(cloudVideoFilePath, '\\扶额无语转场素材视频.mp4'),
    cover: path.join(cloudVideoFilePath, '\\扶额无语转场素材视频.jpg'),
    data: {
      resolutionHeight: 1080,
      resolutionWidth: 1920,
      duration: 1.51,
      startTime: 0,
      thumbnails: [],
      videoExpandedInfo: {
        codec_name: 'h264',
        avg_frame_rate: '30/1',
      },
      audioExpandedInfo: {
        codec_name: 'aac',
        sample_rate: 44100,
      },
    },
  },
];

export default CLOUD_RESOURCE_AUDIO_LIST;
