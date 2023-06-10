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
  url: string;
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
  size?: number;
}

/**
 * @description 获取媒体信息的参数
 */
export interface ICustomMetadataParams {
  /**
   * @description 资源媒体路径
   */
  inputPath: string;
}
