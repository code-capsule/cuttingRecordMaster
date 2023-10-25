import { IParserAudioMetadataStream, IParserVideoMetadataStream } from './parserMetadataType';

/**
 * @description 解析的媒体信息
 */
export interface ICustomMediaMetadata {
  videoInfo: IParserVideoMetadataStream;
  audioInfo: IParserAudioMetadataStream;
}

/**
 * @description 自定义提取的媒体信息
 */
export interface ICustomResponseMetaData {
  /**
   * @description 分辨率
   */
  resolution?: string;
  /**
   * @description 时长
   */
  duration: number;
  /**
   * @description 路径
   */
  filePath: string;
  /**
   * @description 名称
   */
  name: string;
  /**
   * @description 起播事件
   */
  startTime?: number;
  /**
   * @description 大小
   */
  size?: number
  /**
   * @description 视频扩展信息
   */;
  videoExpandedInfo?: {
    /**
     * @description 编码格式
     */
    codec_name?: string;
    /**
     * @description 平均帧率
     */
    avg_frame_rate?: string;
  };
  /**
   * @description 视频扩展信息
   */
  audioExpandedInfo?: {
    /**
     * @description 编码格式
     */
    codec_name?: string;
    /**
     * @description 采样率
     */
    sample_rate?: number;
  };
}

/**
 * @description 获取媒体信息的参数
 */
export interface ICustomMetadataParams {
  /**
   * @description 视频扩展信息
   */
  videoExpandedInfo?: {
    /**
     * @description 编码格式
     */
    codec_name?: string;
    /**
     * @description 平均帧率
     */
    avg_frame_rate?: string;
  };
  /**
   * @description 视频扩展信息
   */
  audioExpandedInfo?: {
    /**
     * @description 编码格式
     */
    codec_name?: string;
    /**
     * @description 采样率
     */
    sample_rate?: number;
  };
}
