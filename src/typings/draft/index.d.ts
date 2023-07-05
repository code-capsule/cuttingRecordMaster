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
     * @description 视频资源池中的资源
     */
    firstVideoPool?: string;
    /**
     * @description 工程总时长
     */
    duration?: number;
    /**
     * @description 工程发布状态
     */
    uploadStatus?: 'unpublish' | 'publishFail' | 'publishSuccess';
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
  }

  interface IDraftDataInfo {
    /**
     * @description 草稿列表
     */
    draftList: IDraftItem[];
  }
}
