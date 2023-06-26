import React, { useEffect, useState } from 'react';
import './index.less';
import { isUndefined, isNull } from 'lodash';
import TopMenu from '@common/components/TopMenu';
import Loading from '@common/components/Loading';
import { WINDOW_IPC_KEY } from '@common/constants/ipcEventKey';
import { LOGIN_PROCESS_KEY } from '@common/constants/processKey';
import { userPageActions } from '@common/stores/reduxStore/actions';

const DEFAULT_COUNT = {
  phone: '18888888888',
  password: 'kfc_v50',
};

enum SlotType {
  NONE,
  FORM,
}

const Main = () => {
  const [phone, setPhone] = useState(DEFAULT_COUNT.phone);
  const [password, setPassword] = useState(DEFAULT_COUNT.password);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [renderSlotType, setRenderSlotType] = useState<SlotType>(SlotType.NONE);

  useEffect(() => {
    // 1. 本地json获取用户信息
    setIsLoading(true);
    const userInfo = window.master.services.userStoreService?.getUserInfo();
    if (isUndefined(userInfo) || isNull(userInfo)) {
      // 2. 不存在用户信息，展示登录表单
      setRenderSlotType(SlotType.FORM);
    } else {
      // 3. 写入用户信息，进入首页
      userPageActions.updateUserInfo(userInfo);
      onOpenHomeWindowAndCloseLoginWindow();
    }
    setIsLoading(false);
  }, []);

  /**
   * @description 打开首页窗口，关闭登录窗口
   */
  const onOpenHomeWindowAndCloseLoginWindow = () => {
    window.master.services.ipc.request(WINDOW_IPC_KEY.OPEN_HOME_WINDOW).then(() => {
      const loginWindowInstance = window.master?.services?.windowService?.get(LOGIN_PROCESS_KEY)?._instance;
      loginWindowInstance?.close();
    });
  };

  /**
   * @description 模拟异步登录
   */
  const onLogin = async () => {
    setIsFormLoading(true);
    setTimeout(() => {
      const userResponse = {
        uid: 'XiaOce_HOT_666',
        username: '掘金第一深情',
        token: 'crazy_thursday_v50',
        phone: DEFAULT_COUNT.phone,
        password: DEFAULT_COUNT.password,
        photoUrl: 'https://p3-passport.byteimg.com/img/user-avatar/27a2d6e99d49991c8cf91dcdafe0c291~100x100.awebp',
      };
      window.master.services.userStoreService.updateUserInfo(userResponse);
      setIsFormLoading(false);
      onOpenHomeWindowAndCloseLoginWindow();
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-drag-box" />
      <div className="login-top-menu">
        <TopMenu currentWindow={LOGIN_PROCESS_KEY} svgColor="rgba(0, 0, 0, 0.4)" />
      </div>
      <div className="login-landing">
        <p className="title">音视频采编一体化</p>
        <p className="label">Audio Video Coding Technology，Light up popular technologies such as Electron, WebRTC, FFmpeg</p>
      </div>
      <div className="login-sign-in">
        {renderSlotType === SlotType.FORM && (
          <>
            <p className="form-title">登录</p>
            <input className="form-input" value={phone} onChange={(e) => setPhone(e?.target?.value)} placeholder={`默认手机: ${DEFAULT_COUNT.phone}`} />
            <input className="form-input" value={password} onChange={(e) => setPassword(e?.target?.value)} placeholder={`默认密码: ${DEFAULT_COUNT.password}`} />
            <div
              className="form-submit"
              onClick={() => {
                if (!isFormLoading) onLogin();
              }}
            >
              Sign In {isFormLoading && <Loading size={20} style={{ marginLeft: 8 }} />}
            </div>
          </>
        )}
        {isLoading && <Loading size={32} />}
      </div>
    </div>
  );
};

export default Main;
