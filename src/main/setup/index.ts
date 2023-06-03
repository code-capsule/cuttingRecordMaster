import initMaster, { InitMainMasterOptions } from './master';

interface SetUpMainOptions extends InitMainMasterOptions {}

export default async function setupMain(
  options?: SetUpMainOptions
): Promise<void> {
  const master = await initMaster(options);
  global.master = master;
}
