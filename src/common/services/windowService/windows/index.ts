import { registerHome } from './home';
import { registerRecord } from './record';

function registerWindow() {
  registerHome();
  registerRecord();
}

export { registerWindow };
