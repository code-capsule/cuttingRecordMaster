declare namespace MasterProjectType {
  /**
   * @description 创建一份工程的参数说明
   */
  interface ICreateProjectStoreParams {
    /**
     * @description 工程 id
     * @summary 新增一份工程则不传，如果传此参数则会在 projectMap 下查询此工程，并以该工程进行创作
     */
    projectId?: string;
    /**
     * @description 工程名
     */
    projectName?: string;
  }

  /**
   * @description 完整的一份工程数据
   */
  interface IProjectDataInfo {
    /**
     * @description 工程id
     */
    id?: string;
    /**
     * @description 工程名
     */
    projectName?: string;
    /**
     * @description 工程封面图，默认取视频首帧
     */
    cover?: string;
    /**
     * @description 工程总时长，单位s
     */
    duration?: number;
    /**
     * @description 工程hash
     * @summary 该字段用于自动保存时检查数据是否有更改
     */
    projectHash?: string;
    /**
     * @description 应用版本号
     * @summary 该字段为了处理不同应用版本与工程版本冲突情况（以A2应用版本打开A1工程草稿数据）
     */
    appVersion?: string;
    /**
     * @description 工程数据版本号
     * @summary 工程发生修改，版本号会跟着改变
     */
    projectVersion?: number;
    /**
     * @description 创建时间
     */
    createTime?: number;
    /**
     * @description 更新时间
     */
    updateTime?: number;
    /**
     * @description 是否删除（物理删除）
     */
    isDelete?: boolean;
    /**
     * @description 素材物料
     */
    material?: { [key: string]: any };
    /**
     * @description 工程中的录制数据
     */
    record?: { [key: string]: any };
  }

  /**
   * @description 存储与本地json文件中的数据格式说明
   */
  interface ISaveLocalProjectJson {
    projectVersion?: number;
    projectData?: IProjectDataInfo;
  }

  /**
   * @description 资源数据
   */
  interface IResourceStructure {
    video?: MasterResourceType.IVideoResource[];
    audio?: MasterResourceType.IAudioResource[];
    image?: MasterResourceType.IImageResource[];
    text?: MasterResourceType.ITextResource[];
  }
  interface IProjectResource {
    /**
     * @description 资源池中的数据
     */
    pool?: IResourceStructure;
  }
}
