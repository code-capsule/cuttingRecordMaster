import { registerHome, createHome } from './home';
import { registerRecord, createRecord } from './record';

function registerWindow() {
  registerHome();
  registerRecord();
}

export { registerWindow, createHome, createRecord };
