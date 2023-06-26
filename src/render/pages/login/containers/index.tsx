import React, { useState } from 'react';
import './index.less';
import TopMenu from '@common/components/TopMenu';
import { LOGIN_PROCESS_KEY } from '@common/constants/processKey';

const DEFAULT_COUNT = {
  phone: '18888888888',
  password: 'kfc_v50'
};

const Main = () => {
  const [phone, setPhone] = useState(DEFAULT_COUNT.phone);
  const [password, setPassword] = useState(DEFAULT_COUNT.password);
  return (
    <div className="login-container">
      <div className='login-drag-box' />
      <div className='login-top-menu'>
        <TopMenu currentWindow={LOGIN_PROCESS_KEY} svgColor='rgba(0, 0, 0, 0.4)' />
      </div>
      <div className="login-landing">
        <p className="title">音视频采编一体化</p>
        <p className="label">探索前端音视频领域，点亮 Electron、WebRTC、FFmpeg 等热门技术</p>
      </div>
      <div className="login-sign-in">
        <p className="form-title">登录</p>
        <input className="form-input" value={phone} onChange={(e) => setPhone(e?.target?.value)} placeholder={`默认手机: ${DEFAULT_COUNT.phone}`} />
        <input className="form-input" value={password} onChange={(e) => setPassword(e?.target?.value)} placeholder={`默认密码: ${DEFAULT_COUNT.password}`} />
        <div className="form-submit">Sign In</div>
      </div>
    </div>
  );
};

export default Main;
