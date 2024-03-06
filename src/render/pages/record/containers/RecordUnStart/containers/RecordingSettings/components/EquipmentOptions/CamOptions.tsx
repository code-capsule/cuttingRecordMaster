import React, { useEffect, useState } from 'react';
import Select, { ISelectItem } from '../../../../../../components/Select';
import SystemTool from '@common/tools/systemTool';
import { ReactComponent as CamIcon } from '@render/pages/record/assets/cam.svg';
import './index.less';

interface IProps {
  camKey: string;
  onChangeCamKey: (camKey: string) => void;
}

const CamOptions = (props: IProps) => {
  const { camKey, onChangeCamKey } = props;
  const [list, setList] = useState<ISelectItem[]>([]);

  useEffect(() => {
    const initCamList = async () => {
      const cams = await SystemTool.getCameraList();
      const camList: ISelectItem[] = cams.map(cam => {
        return {
          key: cam.deviceId,
          value: cam.label
        };
      });
      setList(camList);
      if (camList.length > 0) {
        onChangeCamKey(camList[0].key as string);
      }
    };
    initCamList();
  }, []);

  const handleClickCamKey = (selectItem: ISelectItem) => {
    onChangeCamKey(selectItem.key as string);
  };

  const renderCamIcon = () => {
    return <CamIcon width={20} height={20} style={{ marginRight: '8px' }} />;
  };

  return <div className="equipment-option">
    <Select Icon={renderCamIcon} list={list} currentKey={camKey} onChange={handleClickCamKey}></Select>
  </div>;
};

export default CamOptions;
