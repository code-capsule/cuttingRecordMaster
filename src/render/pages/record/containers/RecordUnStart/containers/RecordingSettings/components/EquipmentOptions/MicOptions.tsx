import React, { useEffect, useState } from 'react';
import Select, { ISelectItem } from '../../../../../../components/Select';
import SystemTool from '@common/tools/systemTool';
import { ReactComponent as MicIcon } from '@render/pages/record/assets/mic.svg';
import './index.less';

interface IProps {
  micKey: string;
  onChangeMicKey: (micKey: ISelectItem) => void;
}

const MicOptions = (props: IProps) => {
  const { micKey, onChangeMicKey } = props;
  const [list, setList] = useState<ISelectItem[]>([]);

  useEffect(() => {
    const initMicList = async () => {
      const mics = await SystemTool.getMicrophoneList();
      const micList: ISelectItem[] = mics.map(mic => {
        return {
          key: mic.deviceId,
          value: mic.label
        };
      });
      setList(micList);
    };
    initMicList();
  }, []);

  const renderMicIcon = () => {
    return <MicIcon width={20} height={20} style={{ marginRight: '8px' }} />;
  };

  return <div className="equipment-option">
    <Select Icon={renderMicIcon} list={list} currentKey={micKey} onChange={onChangeMicKey}></Select>
  </div>;
};

export default MicOptions;
