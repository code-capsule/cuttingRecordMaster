import React from 'react';
import './index.less';
import { ReactComponent as IcCommonAddSvg } from '@common/svgs/ic_common_add.svg';

interface IProps {
  /**
   * @description 文字素材
   */
  material: MasterResourceType.ITextResource;
}

const TextCard = (props: IProps) => {
  return (
    <div
      className="material-text-card-item"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
      }}
    >
      <IcCommonAddSvg className="material-text-card-add-svg" />
      <div
        className="material-text-card-content"
        style={{
          color: props?.material?.data?.fontColor,
          fontSize: props?.material?.data?.fontSize,
          lineHeight: `${props?.material?.data?.fontSize ? props?.material?.data?.fontSize + 8 : 16}px`,
        }}
      >
        {props?.material?.data?.content}
      </div>
    </div>
  );
};

export default TextCard;
