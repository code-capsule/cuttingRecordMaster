import { registerHome } from './home';
import { registerLogin } from './login';
import { registerRecord } from './record';

function registerWindow() {
  registerHome();
  registerLogin();
  registerRecord();
}

export { registerWindow };
