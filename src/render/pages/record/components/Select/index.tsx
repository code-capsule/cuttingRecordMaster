import React, { useEffect, useState, useRef, ReactNode } from 'react';
import './index.less';

import { ReactComponent as IncreaseIcon } from './assets/ic_arrow_down.svg';

export declare type RawValue = number | string;

export interface ISelectItem {
  key: RawValue;
  value: string;
}

export interface ISelectStyle {
  width?: number;
}

export interface IProps {
  currentKey: RawValue;
  list: ISelectItem[];
  style?: ISelectStyle;
  disabled?: boolean;
  children?: ReactNode;
  Icon?: React.FC<void>;
  optionsDirection?: string; // 下拉框的方向：bottom / top
  onClick?: (visible: boolean) => void; // 点击输入框时触发的事件
  onChange: (item: ISelectItem) => void;
}

export const getCurrentValue = (list: ISelectItem[], key: RawValue, defaultValue = ''): string => {
  if (!list || list.length <= 0) {
    return defaultValue;
  }
  const currentIndex = list.findIndex((item: ISelectItem) => item.key === key);
  return currentIndex === -1 ? defaultValue : list[currentIndex].value;
};

const Select = (props: IProps) => {
  const { currentKey, style, children, Icon, list } = props;
  const optionsDirection = props.optionsDirection || 'bottom';

  const getCurrentSelectValue = (key: RawValue): string => {
    const { list } = props;
    return getCurrentValue(list, key);
  };

  const selectRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const _currentValue = getCurrentSelectValue(currentKey);
  const [currentValue, setCurrentValue] = useState<string>(_currentValue);

  // 点击其它地方，要收起下拉框
  useEffect(() => {
    document.addEventListener('click', handleClickDocument);
    return () => {
      document.removeEventListener('click', handleClickDocument);
    };
  }, []);

  useEffect(() => {
    const _currentValue = getCurrentSelectValue(currentKey);
    setCurrentValue(_currentValue);
  }, [currentKey, list]);

  const handleClickDocument = (e: Event): void => {
    const isSelectWrap = Boolean(selectRef?.current?.contains?.(e?.target));
    if (!isSelectWrap) {
      setVisible(false);
    }
  };

  const renderSelectOptions = () => {
    const { list } = props;
    return (
      <div className={`select-options ${optionsDirection}`}>
        {list.map((item: ISelectItem, index: number) => {
          return (
            <div
              key={index}
              className={`select-options-item ${currentKey === item.key ? 'selected' : ''}`}
              onMouseDown={(e: any) => handleClickOption(e, item)}
            >
              {item.value}
            </div>
          );
        })}
      </div>
    );
  };

  const handleClickOption = (e: Event, item: ISelectItem): void => {
    e.stopPropagation();
    const { onChange } = props;
    switchVisible();
    onChange(item);
  };

  const handleClickSelect = (): void => {
    if (props.disabled) {
      return;
    }
    props.onClick && props.onClick(visible);
    switchVisible();
  };

  const switchVisible = (): void => {
    setVisible(!visible);
  };

  const wrapStyle = {
    width: `${style?.width || 200}px`,
  };

  return (
    <div
      ref={selectRef}
      className={`select ${props.disabled ? 'disabled' : ''}`}
      style={wrapStyle}
      onClick={handleClickSelect}
    >
      {children ? children : <>
          { Icon ? Icon() : null }
          <div className="select-value">{currentValue}</div>
        </>}
      <div className={`select-arrow ${visible ? 'up' : ''}`}>
        <IncreaseIcon />
      </div>
      {visible && renderSelectOptions()}
    </div>
  );
};

export default Select;
