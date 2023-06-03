import master from './master';

interface SetUpMainOptions {}

export default async function setupMain(options?: SetUpMainOptions) {
  global.master = master;
  require('@electron/remote/main').initialize();
}
