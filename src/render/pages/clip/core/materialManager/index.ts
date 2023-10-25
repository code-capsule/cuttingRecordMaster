/**
 * @TODO 素材管理器
 */
import ClipCore from '@render/pages/clip/core';
import { findIndex, cloneDeep } from 'lodash';
import { EResourceType } from '@src/typings/resource/enum';
import { projectPageActions } from '@common/stores/reduxStore/actions';

interface IResponseMaterial {
  executeMaterials: MasterResourceType.IResourceItem[];
  totalMaterials: MasterProjectType.IMaterialStructure;
}

class MaterialManager {
  /**
   * @description 新增视频素材
   * @param {string[]} filePaths 视频素材路径
   */
  async insertVideoMaterial(filePaths: string[]): Promise<IResponseMaterial> {
    const metadataInfos = await Promise.all(filePaths?.map((filePath) => ClipCore.mediaManager.parseVideoAndGenerateFrames({ filePath })));
    const assembles = metadataInfos?.map((metadata, idx) => {
      if (metadata) {
        const currentTimeStamp = new Date().valueOf();
        const [width, height] = metadata?.resolution?.split('x') || [];
        const materialId = `${currentTimeStamp}${Math.random().toString(10).slice(0, 5)}`;
        const videoMaterial: MasterResourceType.IVideoResource = {
          uid: materialId,
          type: EResourceType.video,
          size: metadata?.size,
          name: metadata?.name,
          createTime: currentTimeStamp,
          updateTime: currentTimeStamp,
          isExistResource: true,
          inputPath: filePaths?.[idx],
          cover: metadata?.cover,
          data: {
            duration: metadata?.duration || 0,
            startTime: metadata?.startTime || 0,
            resolutionWidth: parseInt(width) || 0,
            resolutionHeight: parseInt(height) || 0,
            thumbnails: metadata?.thumbnails || [],
            audioExpandedInfo: metadata?.audioExpandedInfo,
            videoExpandedInfo: metadata?.videoExpandedInfo,
          },
        };
        return videoMaterial;
      } else return undefined;
    });
    const insertVideoMaterials = assembles?.filter((ass) => ass?.uid) as MasterResourceType.IVideoResource[];
    const oldMaterial = (window?.master?.stores?.reduxStore?.getState() as MasterAppStoreType.AppState)?.projectPage?.material || {};
    const newMaterial = {
      ...oldMaterial,
      video: (oldMaterial?.video || [])?.concat(insertVideoMaterials),
    };
    projectPageActions?.updateProjectInfo?.({ material: newMaterial });
    return { executeMaterials: insertVideoMaterials, totalMaterials: newMaterial };
  }

  /**
   * @description 删除素材
   * @param {EResourceType} materialType 素材类型
   * @param {T extends MasterResourceType.IResourceItem} material 素材数据
   */
  deleteMaterial<T extends MasterResourceType.IResourceItem>(materialType: EResourceType, material: T): IResponseMaterial {
    const oldMaterial = (window?.master?.stores?.reduxStore?.getState() as MasterAppStoreType.AppState)?.projectPage?.material || {};
    const newTextMaterial = cloneDeep(oldMaterial?.text || []);
    const newVideoMaterial = cloneDeep(oldMaterial?.video || []);
    const newImageMaterial = cloneDeep(oldMaterial?.image || []);
    if (materialType === EResourceType.text) {
      const findIdx = findIndex(newTextMaterial, (m) => m?.uid === material?.uid);
      newTextMaterial?.splice(findIdx, 1);
    }
    if (materialType === EResourceType.video) {
      const findIdx = findIndex(newVideoMaterial, (m) => m?.uid === material?.uid);
      newVideoMaterial?.splice(findIdx, 1);
    }
    if (materialType === EResourceType.image) {
      const findIdx = findIndex(newImageMaterial, (m) => m?.uid === material?.uid);
      newImageMaterial?.splice(findIdx, 1);
    }
    const newMaterial = {
      ...oldMaterial,
      text: newTextMaterial,
      video: newVideoMaterial,
      image: newImageMaterial,
    };
    projectPageActions?.updateProjectInfo?.({ material: newMaterial });
    return { executeMaterials: [material], totalMaterials: newMaterial };
  }
}

export default new MaterialManager();
