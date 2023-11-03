import { registerHome } from './home';
import { registerLogin } from './login';
import { registerRecord } from './record';
import { registerClip } from './clip';
import { registerScreenCamera } from './screenCamera';

function registerWindow() {
  registerHome();
  registerLogin();
  registerRecord();
  registerClip();
  registerScreenCamera();
}

export { registerWindow };
