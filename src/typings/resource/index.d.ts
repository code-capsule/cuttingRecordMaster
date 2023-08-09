declare namespace MasterResourceType {
  type TResourceFromType = 'local' | 'cloud';
  type TResourceType = 'text' | 'video' | 'audio' | 'image';

  // 基础资源类型声明
  interface InitializeResource {
    /**
     * @description 资源 uid
     * @summary 时间戳+随机数
     * @example `${new Date().valueOf()}${Math.random().toString(10).slice(0, 5)}`
     */
    uid?: string;
    /**
     * @description 资源类型
     */
    type?: TResourceType;
    /**
     * @description 资源后缀
     */
    ext?: string;
    /**
     * @description 资源来源
     */
    fromType?: TResourceFromType;
    /**
     * @description 资源大小
     */
    size?: number;
    /**
     * @description 资源名
     */
    name?: string;
    /**
     * @description 是否显示
     */
    visible?: boolean;
    /**
     * @description 创建时间
     */
    createTime?: number;
    /**
     * @description 更新时间
     */
    updateTime?: number;
    /**
     * @description 资源在本地映射是否存在
     * @summary 可能用户在加入资源池后，把本地真实资源给删除了，此时的资源是不存在的
     */
    isExistResource?: boolean;
  }

  // 视频
  interface ICustomResourceVideoData {
    /**
     * @description 分辨率高
     */
    resolutionHeight?: number;
    /**
     * @description 分辨率宽
     */
    resolutionWidth?: number;
    /**
     * @description 资源时长
     */
    duration?: number;
    /**
     * @description 起播时间
     */
    startTime?: number;
    /**
     * @description 资源存于本地的路径
     */
    inputPath?: string;
    /**
     * @description 资源封面
     */
    cover?: string;
    /**
     * @description 资源缩略图
     */
    thumbnails?: string[];
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
     * @description 音频扩展信息
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

  // 音频
  interface ICustomResourceAudioData {
    /**
     * @description 资源封面
     */
    cover?: string;
    /**
     * @description 资源时长
     */
    duration?: number;
    /**
     * @description 比特率
     */
    bit_rate?: number;
    /**
     * @description 编码格式
     */
    codec_name?: string;
    /**
     * @description 采样率
     */
    sample_rate?: number;
    /**
     * @description 平均帧率
     */
    avg_frame_rate?: string;
  }

  // 图片
  interface ICustomResourceImageData {
    /**
     * @description 资源封面
     */
    cover?: string;
    /**
     * @description 分辨率高
     */
    resolutionHeight?: number;
    /**
     * @description 分辨率宽
     */
    resolutionWidth?: number;
  }

  // 文字
  interface IResourcePointer {
    x?: number;
    y?: number;
    x1?: number;
    y1?: number;
  }
  interface ICustomResourceTextData {
    /**
     * @description 文字内容
     */
    content?: string;
    /**
     * @description 文本颜色
     */
    fontColor?: string;
    /**
     * @description 文本大小
     */
    fontSize?: number;
    /**
     * @description 坐标位置
     */
    pointer?: IResourcePointer;
  }

  interface IVideoResource extends InitializeResource {
    data: ICustomResourceVideoData;
  }

  interface IAudioResource extends InitializeResource {
    data: ICustomResourceAudioData;
  }

  interface IImageResource extends InitializeResource {
    data: ICustomResourceImageData;
  }

  interface ITextResource extends InitializeResource {
    data: ICustomResourceImageData;
  }

  type IResourceItem = IVideoResource | IAudioResource | IImageResource | ITextResource;
}
