import { findIndex } from 'lodash';
import { IReturnResponseTrackCell } from './index';
import { EResourceType } from '@src/typings/resource/enum';
import { projectPageActions } from '@common/stores/reduxStore/actions';

class VideoTrackManager {
  /**
   * @description 根据片段id获取素材信息
   * @param cellId 片段id
   */
  public get(cellId: string) {
    if (!cellId) return null;
    const store = window?.master?.stores?.reduxStore?.getState() as MasterAppStoreType.AppState;
    const videoCells = store?.projectPage?.track?.videoTrack?.cells || [];
    const findIdx = findIndex(videoCells, (cell: MasterTrackCell.IVideoTrackCell) => cell?.uid === cellId);
    if (findIdx === -1) return null;
    else return videoCells?.[findIdx];
  }

  /**
   * @description 往视频轨上插入一条 cell
   * @param {string} materialId 视频素材 id
   * @param {number} trackStartTime 相对轨道的播放时间
   * @return {IReturnResponseTrackCell}
   */
  public insert(materialId?: string, trackStartTime?: number): IReturnResponseTrackCell {
    const store = window?.master?.stores?.reduxStore?.getState() as MasterAppStoreType.AppState;
    const videoCells = store?.projectPage?.track?.videoTrack?.cells || [];
    const textCells = store?.projectPage?.track?.textTrack?.cells || [];
    const imageCells = store?.projectPage?.track?.imageTrack?.cells || [];
    let newVideoCells = [...videoCells];
    if (materialId) {
      const insertAssembleVideoCell: MasterTrackCell.IVideoTrackCell = {
        uid: String(Math.floor(Math.random() * Math.pow(10, 10))),
        type: EResourceType.video,
        materialId,
        trackStartTime: trackStartTime || 0,
        zIndex: 0,
      };
      newVideoCells = videoCells?.concat(insertAssembleVideoCell);
      projectPageActions?.updateProjectVideoTrack?.(newVideoCells);
    }
    return { newVideoCells, newImageCells: imageCells, newTextCells: textCells };
  }
}

export default VideoTrackManager;
