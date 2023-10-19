import { IPluginCore, IPluginItemBase } from '../../typings/recordPluginManager';

abstract class PluginCore<PluginItem extends IPluginItemBase<IPluginContext>, IPluginContext> implements IPluginCore<PluginItem, IPluginContext> {
  public plugins: PluginItem[] = [];

  constructor() {}

  public init(plugins: PluginItem[]) {
    this.plugins = plugins;
  }

  public register(plugin: PluginItem) {
    // TODO: 参数异常判断
    this.plugins.push(plugin);
  }

  public getAllPlugins(): PluginItem[] {
    return this.plugins;
  }
}
export default PluginCore;
