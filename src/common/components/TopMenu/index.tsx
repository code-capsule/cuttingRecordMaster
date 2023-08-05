import React from 'react';
import './index.less';
import { ReactComponent as IcCommonCloseSvg } from '@common/svgs/ic_common_close.svg';
import { ReactComponent as IcCommonMinimizeSvg } from '@common/svgs/ic_common_minimize.svg';

interface IProps {
  /**
   * @description 当前窗口标识
   */
  currentWindow: string;
  /**
   * @description 最小化回调
   */
  onMinimize?: () => void;
  /**
   * @description 关闭回调
   */
  onClose?: () => void;
  /**
   * @description 图标颜色
   */
  svgColor?: string;
}

const TopMenu = (props: IProps) => {
  return (
    <div className="common-menu">
      <IcCommonMinimizeSvg
        className="small"
        style={{ color: props?.svgColor || '#F8F8F8' }}
        onClick={() => {
          props?.onMinimize?.();
          const currentWindowInstance = window.master?.services?.windowService?.get(props?.currentWindow)?._instance;
          currentWindowInstance?.minimize();
        }}
      />
      <IcCommonCloseSvg
        className="small"
        style={{ color: props?.svgColor || '#F8F8F8' }}
        onClick={() => {
          // 可能关闭回调是个异步行为，导致异步未处理完就直接 close 关闭窗口造成非期望的结果，为此存在回调时用户自行处理关闭
          if (props?.onClose) {
            props?.onClose();
          } else {
            const currentWindowInstance = window.master?.services?.windowService?.get(props?.currentWindow)?._instance;
            currentWindowInstance?.close();
          }
        }}
      />
    </div>
  );
};

export default TopMenu;
