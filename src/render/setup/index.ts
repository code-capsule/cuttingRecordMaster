import initMaster, { InitMasterOptions } from './master';

export interface SetupRenderOptions extends InitMasterOptions {}

async function setupRender(options: SetupRenderOptions): Promise<void> {
  return new Promise((resolve) => {
    let masterIsInit = false;
    let domContentLoaded = false;
    initMaster(options).then((master) => {
      window.master = master;
      masterIsInit = true;
      if (domContentLoaded) resolve();
    });
    document.addEventListener('DOMContentLoaded', () => {
      domContentLoaded = true;
      if (masterIsInit) resolve();
    });
  });
}

export default setupRender;
