import { registerHome, createHome } from './home';
import { registerLogin, createLogin } from './login';
import { registerRecord, createRecord } from './record';

function registerWindow() {
  registerHome();
  registerLogin();
  registerRecord();
}

export { registerWindow, createHome, createLogin, createRecord };
