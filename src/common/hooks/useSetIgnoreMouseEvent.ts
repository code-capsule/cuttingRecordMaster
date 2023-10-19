import React, { useEffect } from 'react';
import { setWindowIgnoreMouseEvent } from '@common/utils/ignoreMouseEvent';
import { RECORD_PROCESS_KEY } from '@src/common/constants/processKey';
import { getLogger } from '@common/tools/log';
const log = getLogger('useSetIgnoreMouseEvent');

interface IUseSetIgnoreMouseEventProps {
  /**
   * 要忽略的元素，值为 useRef 的结果
   */
  ignoreElementRef: React.RefObject<HTMLElement | null>;
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
    if (!ignoreElementRef.current) {
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

    ignoreElementRef.current.addEventListener('mouseenter', handleMouseEnter);
    ignoreElementRef.current.addEventListener('mouseleave', handleMouseLeave);
    window.requestIdleCallback(() => {
      setWindowIgnoreMouseEvent({ ignore: true, processKey });
      log.info(`RenderInit: set window mouse event ignore is true, the windowKey is ${processKey}`);
    });
    return () => {
      if (ignoreElementRef.current) {
        ignoreElementRef.current.removeEventListener('mouseenter', handleMouseEnter);
        ignoreElementRef.current.removeEventListener('mouseleave', handleMouseLeave);
        setWindowIgnoreMouseEvent({ ignore: false, processKey });
        log.info('useSetIgnoreMouseEvent useEffect removeEventListener');
      }
    };
  }, [ignoreElementRef.current]);
};

export default useSetIgnoreMouseEvent;
