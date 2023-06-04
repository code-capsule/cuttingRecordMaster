# Electron+React 从 0 到 1 打造音视频采编一体应用实战

## 第九章-基建篇-数据存储方案

- 采用 redux 作为项目的状态管理工具，@reduxjs/toolkit 简化 redux 工作流程
- 通过 electron-store 将数据以 json 方式本地持久化，数据文件会储存在应用程序配置文件的文件夹，默认是 appData
- electron 和 redux 共用会存在问题，多个渲染进程对应多个 Store，但我们有且只有一个，所以采用 electron-redux 解决。
- 跨进程数据共享的核心思想是：将 Redux 在主进程上视为唯一的数据源，而各个渲染进程之间的存储则由主进程作为代理
