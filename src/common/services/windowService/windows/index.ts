import { registerHome, createHome } from './home';
import { registerLogin, createLogin } from './login';
import { registerRecord, createRecord } from './record';
import { registerClip, createClip } from './clip';
import { registerScreenCamera } from './screenCamera';

function registerWindow() {
  registerHome();
  registerLogin();
  registerRecord();
  registerClip();
  registerScreenCamera();
}

export { registerWindow, createHome, createLogin, createRecord, createClip };
