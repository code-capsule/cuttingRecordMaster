import { registerHome, createHome } from './home';
import { registerLogin, createLogin } from './login';
import { registerRecord, createRecord } from './record';
import { registerClip, createClip } from './clip';

function registerWindow() {
  registerHome();
  registerLogin();
  registerRecord();
  registerClip();
}

export { registerWindow, createHome, createLogin, createRecord, createClip };
