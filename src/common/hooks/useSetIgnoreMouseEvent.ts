import React, { useEffect } from 'react';
import { setWindowIgnoreMouseEvent } from '@common/utils/ignoreMouseEvent';
import { RECORD_PROCESS_KEY } from '@src/common/constants/processKey';
import { getLogger } from '@common/tools/log';
const log = getLogger('useSetIgnoreMouseEvent');

interface IUseSetIgnoreMouseEventProps {
  /**
   * 要忽略的元素，值为 useRef 的结果
   */
  ignoreElementRef: HTMLDivElement | null;
  /**
   * capsule.windowCenter.windows 的 key
   */
  processKey?: string;
}

/**
 * 传入要忽略穿透的元素，当点击这个元素以外的内容可以穿透当前窗口
 * @param props 参数
 */
const useSetIgnoreMouseEvent = (props: IUseSetIgnoreMouseEventProps) => {
  const { ignoreElementRef, processKey = RECORD_PROCESS_KEY } = props;

  useEffect(() => {
    if (!ignoreElementRef) {
      log.error('ignoreElementRef is null');
      return;
    }

    log.info('useSetIgnoreMouseEvent useEffect');

    const handleMouseEnter = () => {
      log.info('handleMouseEnter');
      setWindowIgnoreMouseEvent({ ignore: false, processKey });
    };

    const handleMouseLeave = () => {
      log.info('handleMouseLeave');
      setWindowIgnoreMouseEvent({ ignore: true, processKey });
    };

    ignoreElementRef.addEventListener('mouseenter', handleMouseEnter);
    ignoreElementRef.addEventListener('mouseleave', handleMouseLeave);
    // ignoreElementRef.current.addEventListener('mousemove', handleMouseEnter);
    return () => {
      if (ignoreElementRef) {
        ignoreElementRef.removeEventListener('mouseenter', handleMouseEnter);
        ignoreElementRef.removeEventListener('mouseleave', handleMouseLeave);
        // ignoreElementRef.current.removeEventListener('mousemove', handleMouseEnter);
      }
    };
  }, [ignoreElementRef]);
};

export default useSetIgnoreMouseEvent;
