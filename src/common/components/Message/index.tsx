import './index.less';

interface IToastOptions {
  time?: number;
  style?: React.CSSProperties;
}

const toast = (msg: string, className: string, options?: IToastOptions) => {
  const tipsDom = document.createElement('div');
  tipsDom.className = `common-message ${className}`;
  if (msg) tipsDom.innerText = msg;
  document.body.appendChild(tipsDom);
  setTimeout(() => {
    document.body.removeChild(tipsDom);
  }, options?.time || 3000);
};

class Message {
  success = (msg: string, options?: IToastOptions) => {
    toast(msg, 'successful', options);
  };
  error = (msg: string, options?: IToastOptions) => {
    toast(msg, 'error', options);
  };
  warning = (msg: string, options?: IToastOptions) => {
    toast(msg, 'warning', options);
  };
  info = (msg: string, options?: IToastOptions) => {
    toast(msg, 'successful', options);
  };
}

export default new Message();
