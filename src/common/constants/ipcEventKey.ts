/**
 * @description 所有通信事件名
 */

// 窗口相关
export const WINDOW_IPC_KEY = {
  OPEN_HOME_WINDOW: 'windowService.open.home.window', // 打开首页窗口
};

// 工程数据相关
export const PROJECT_STORE_IPC_KEY = {
  INIT_PROJECT_STORE: 'projectStoreService.init.store', // 初始化工程
  UNMOUNT_PROJECT_STORE: 'projectStoreService.unmount.store', // 卸载工程
};

// 草稿数据相关
export const DRAFT_STORE_IPC_KEY = {
  GET_LIST: 'draftStoreService.get.draft.list', // 获取草稿列表
};
