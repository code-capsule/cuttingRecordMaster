declare namespace MasterDraftType {
  interface IDraftItem {
    /**
     * @description 工程id
     */
    id?: string;
    /**
     * @description 工程名
     */
    projectName?: string;
    /**
     * @description 工程封面
     */
    cover?: string;
    /**
     * @description 视频素材的第一个链接
     * @summary 没合成前是录的素材地址，合成的话就是合成地址
     */
    videoUrl?: string;
    /**
     * @description 工程总时长
     */
    duration?: number;
    /**
     * @description 创建时间
     */
    createTime?: number;
    /**
     * @description 更新时间
     */
    updateTime?: number;
    /**
     * @description 是否删除（物理删除）用于回收站
     */
    isDelete?: boolean;
  }

  interface IDraftDataInfo {
    /**
     * @description 草稿列表
     */
    draftList: IDraftItem[];
  }
}
