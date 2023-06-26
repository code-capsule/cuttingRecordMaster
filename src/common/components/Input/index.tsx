import React, { useRef, useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import './index.less';

const DEFAULT_LIMIT_COUNT = 100;

export interface InputAttributeProps {
  limit?: number;
  disabled?: boolean;
  placeholder?: string;
  /**
   * @description 设置为true时候，将对数据值进行实时提示
   */
  openTip?: boolean;
  /**
   * @description 错误提示
   */
  tipText?: string;
}

export interface IProps {
  data: string;
  onChange: (newData: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = React.memo((props: IProps & InputAttributeProps) => {
  const [valueLength, setValueLength] = useState<number>(0);
  const [isInputHover, setIsInputHover] = useState<boolean>(false);
  const [isInputWrite, setIsInputWrite] = useState<boolean>(false);

  const isChineseRef = useRef<boolean>(false); // 是否输入中文
  const inputValueRef = useRef<string>('');
  const inputElementRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputValueRef.current = props?.data;
    let count = 0;
    const _limit = props?.limit || DEFAULT_LIMIT_COUNT;
    for (let i = 0; i < inputValueRef.current?.length; i++) {
      const char = inputValueRef.current.charAt(i);
      const charCode = char.charCodeAt(0);
      count += isFullWidth(charCode) ? 2 : 1;
    }
    if (count <= _limit) setValueLength(count);
    else setValueLength(_limit);
  }, [props?.data, props?.limit]);

  const onMouseEnterRefFn = useRef<() => void>();
  onMouseEnterRefFn.current = debounce(() => {
    if (!isInputHover) setIsInputHover(true);
  }, 16.7);

  const onMouseLeaveRefFn = useRef<() => void>();
  onMouseLeaveRefFn.current = debounce(() => {
    if (!isInputWrite) setIsInputHover(false);
  }, 16.7);

  const onFocusRefFn = useRef<() => void>();
  onFocusRefFn.current = () => {
    setIsInputWrite(true);
    props?.onFocus?.();
  };

  const onBlurRefFn = useRef<() => void>();
  onBlurRefFn.current = () => {
    setIsInputHover(false);
    setIsInputWrite(false);
    if (isChineseRef.current) isChineseRef.current = false;
    props?.onBlur?.();
  };

  /**
   * @description 判断字符是否为中文全角字符或其他全角字符
   * @returns
   */
  const isFullWidth = (charCode: number) => {
    return (
      (charCode >= 0x1100 && charCode <= 0x11ff) ||
      (charCode >= 0x2e80 && charCode <= 0xa4cf) ||
      (charCode >= 0xac00 && charCode <= 0xd7a3) ||
      (charCode >= 0xf900 && charCode <= 0xfaff) ||
      (charCode >= 0xfe30 && charCode <= 0xfe6f) ||
      (charCode >= 0xff00 && charCode <= 0xff60) ||
      (charCode >= 0xffe0 && charCode <= 0xffe6)
    );
  };

  const setLimitValue = useCallback(
    (value: string) => {
      const inputValueArr = [];
      let inputValueArrIndex = 0;
      for (let i = 0; i < value.length; i++) {
        const char = value.charAt(i);
        const charCode = char.charCodeAt(0);
        // 判断是否为中文
        const isChineseChar = isFullWidth(charCode);
        if (isChineseChar) {
          inputValueArr[inputValueArrIndex++] = '';
        }
        inputValueArr[inputValueArrIndex++] = char;
      }
      // 截取用户输入前maxLength 个字符数
      const result = inputValueArr.slice(0, props?.limit).join('');
      // setValue(result);
      props?.onChange?.(result);
    },
    [props?.limit, props?.onChange]
  );

  const setLimitInputSelectionPos = useCallback(
    (oldInputSelectionPosition: number | null | undefined) => {
      // 需要等dom更新后才去获取当前输入框中光标的位置，这里使用微任务process.nextTick在一次事件循环中完成执行块代码
      process.nextTick(() => {
        const currentInputSelectionPos = inputElementRef.current?.selectionStart;
        if (!oldInputSelectionPosition || !currentInputSelectionPos) {
          return;
        }
        if (oldInputSelectionPosition <= currentInputSelectionPos) {
          inputElementRef.current?.setSelectionRange(oldInputSelectionPosition, oldInputSelectionPosition);
          return;
        }
      });
    },
    [inputElementRef.current]
  );

  const setLimitLengthInput = useCallback(
    (value: string) => {
      const oldInputSelectionPosition = inputElementRef?.current?.selectionStart;
      setLimitValue(value);
      setLimitInputSelectionPos(oldInputSelectionPosition);
    },
    [inputElementRef?.current]
  );

  return (
    <div className="common-input">
      <input
        spellCheck={false}
        readOnly={false}
        ref={inputElementRef}
        onCompositionStart={() => {
          isChineseRef.current = true;
        }}
        maxLength={props?.limit || DEFAULT_LIMIT_COUNT}
        onCompositionEnd={(e: React.CompositionEvent<HTMLInputElement>) => {
          isChineseRef.current = false;
          const val = (e?.target as EventTarget & HTMLInputElement)?.value;
          setLimitLengthInput(val);
        }}
        disabled={props?.disabled}
        placeholder={props?.placeholder}
        value={props?.data || ''}
        onBlur={onBlurRefFn.current}
        onFocus={onFocusRefFn.current}
        onMouseEnter={onMouseEnterRefFn.current}
        onMouseLeave={onMouseLeaveRefFn.current}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const _text = e?.target?.value;
          // 在输入非中文的情况下，截取允许最大输入
          if (!isChineseRef.current) {
            setLimitLengthInput(_text);
            return;
          }
          // 需要触发onChange才会触发onCompositionEnd
          props?.onChange?.(_text);
        }}
        className={`input ${isInputHover ? 'active' : ''}`}
      />
      {!!props?.limit && (
        <div onClick={() => inputElementRef.current?.focus()} className={`${isInputHover ? 'active' : ''} limit`}>
          {valueLength} / {props?.limit}
        </div>
      )}
      {props?.openTip && <div className="tips">{valueLength === 0 && (props?.tipText || props?.placeholder)}</div>}
    </div>
  );
});

export default Input;
