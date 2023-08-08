import React, { useState, useEffect } from 'react';
import './index.less';
import { debounce } from 'lodash';
import { useSelector, shallowEqual } from 'react-redux';
const MAX_COUNT = 30;

const ClipName = React.memo(() => {
  const [name, setName] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const [valueLen, setValueLen] = React.useState<number>(0);

  const projectName = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.projectName, shallowEqual);

  useEffect(() => {
    if (projectName) {
      setName(projectName);
      setValueLen(projectName.length);
    }
  }, [projectName]);

  const onMouseEnter = debounce(() => {
    if (!isHover) setIsHover(true);
  }, 50);

  const onMouseLeave = debounce(() => {
    if (!isWrite) setIsHover(false);
  }, 50);

  const onFocus = debounce(() => {
    setIsWrite(true);
  }, 50);

  const onBlur = debounce(() => {
    window.master.services.projectStoreService.updateProjectInfo({
      projectName: name,
    });
    setIsWrite(false);
    setIsHover(false);
  }, 50);
  const isChineseInputRef = React.useRef<boolean>(); // 是否正在输入中文
  const inputValueRef = React.useRef<string>(''); // 输入的内容

  return (
    <div className="clip-name-container">
      <input
        className={`clip-name-input ${isHover ? 'hover' : ''}`}
        maxLength={MAX_COUNT}
        value={name}
        onBlur={onBlur}
        onFocus={onFocus}
        onCompositionStart={() => {
          isChineseInputRef.current = true;
        }}
        onCompositionEnd={() => {
          isChineseInputRef.current = false;
          setValueLen(inputValueRef.current.length);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onChange={(e) => {
          const text = e?.target?.value || '';
          setName(text);
          inputValueRef.current = text;
          if (!isChineseInputRef.current) setValueLen(text.length);
        }}
      />
      {isHover && (
        <div className="name-count">
          {valueLen}/{MAX_COUNT}
        </div>
      )}
    </div>
  );
});

export default ClipName;
