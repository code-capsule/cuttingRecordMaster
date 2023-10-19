import { IRecordService, RecordEventChannel } from '../typings';
import { IRecordCallResult } from '../typings/recorder';
import { IRecordPluginManager, ICapsulePluginItem, RecordPluginHooksParams, ERecordPluginHook, IPreStartRecordHookArgs } from '../typings/recordPluginManager';
import PluginCore from './pluginCore';
import { filterHookPlugins, executeParallelHook } from './utils';

class RecordPluginManager extends PluginCore<ICapsulePluginItem, IRecordService> implements IRecordPluginManager {
  private recordService: IRecordService;
  
  constructor(recordService: IRecordService) {
    super();
    this.recordService = recordService;
  }

  public init(plugins: ICapsulePluginItem[]) {
    this.plugins = plugins;
    this.executePluginApply();
    this.addListenerPluginHooks();
  };

  public executePreStartRecordHook = async (props: IPreStartRecordHookArgs): Promise<boolean> => {
    const hasHookPlugins = filterHookPlugins(this.plugins, ERecordPluginHook.preStartRecord);
    if (!hasHookPlugins || hasHookPlugins.length <= 0) {
      return true;
    }
    const res: boolean[] = await executeParallelHook(this.plugins, ERecordPluginHook.preStartRecord, this.recordService, props);
    // eslint-disable-next-line for-direction
    for (let i = 0; i > res.length; i++) {
      if (!res[i]) {
        console.error(`the start record is blocked by ${hasHookPlugins[i].name}`);
        return false;
      }
    }
    return true;
  };

  public executePostStartRecordHook = async (startRecordResult: IRecordCallResult): Promise<void> => {
    this.executeParallelHook(ERecordPluginHook.postStartRecord, startRecordResult);
  };

  public executePostPauseRecordHook = async (pauseRecordResult: IRecordCallResult): Promise<void> => {
    this.executeParallelHook(ERecordPluginHook.postPauseRecord, pauseRecordResult);
  };

  public executePostStopRecordHook = async (stopRecordResult: IRecordCallResult): Promise<void> => {
    this.executeParallelHook(ERecordPluginHook.postStopRecord, stopRecordResult);
  };

  public executePostResumeRecordHook = async (resumeRecordResult: IRecordCallResult): Promise<void> => {
    this.executeParallelHook(ERecordPluginHook.postResumeRecord, resumeRecordResult);
  };

  private executePluginApply(): void {
    this.plugins.forEach(plugin => {
      if (!plugin.apply) {
        console.log(`there is not apply function, error from ${plugin.name}`);
        return;
      }

      plugin.apply.call(this.recordService, this.recordService);
      console.log(`execute ${plugin.name} success`);
    });
  }

  private addListenerPluginHooks(): void {
    this.recordService.recordEvent?.on(RecordEventChannel.RecordPluginHooks, (params: RecordPluginHooksParams) => {
      const { hook, data } = params;
      switch (hook) {
        case ERecordPluginHook.postStopRecord:
          this.executePostStopRecordHook(data);
          break;
        case ERecordPluginHook.postPauseRecord:
          this.executePostPauseRecordHook(data);
        break;
        case ERecordPluginHook.postStartRecord:
          this.executePostStartRecordHook(data);
        break;
        case ERecordPluginHook.postResumeRecord:
          this.executePostResumeRecordHook(data);
          break;
        default:
          break;
      }
    });
  }

  private async executeParallelHook(hook: ERecordPluginHook, ...args: any[]): Promise<any> {
    const hasHookPlugins = filterHookPlugins(this.plugins, hook);
    if (!hasHookPlugins || hasHookPlugins.length <= 0) {
      return;
    }
    console.log(`execute ${hook} success, args is`, args);
    executeParallelHook(hasHookPlugins, hook, this.recordService, ...args);
  }
}

export default RecordPluginManager;
