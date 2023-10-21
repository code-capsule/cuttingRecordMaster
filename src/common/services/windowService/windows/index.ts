import { registerHome } from './home';
import { registerLogin } from './login';
import { registerRecord } from './record';
import { registerClip } from './clip';

function registerWindow() {
  registerHome();
  registerLogin();
  registerRecord();
  registerClip();
}

export { registerWindow };
