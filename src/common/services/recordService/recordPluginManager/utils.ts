import { ICapsulePluginItem, ERecordPluginHook } from '../typings/recordPluginManager';

/**
 * 合并两个插件列表
 * TODO：还需要做覆盖
 * @param prePlugins 第一个插件列表
 * @param plugins 要覆盖的插件列表
 */
export function mergePlugins(prePlugins: ICapsulePluginItem[], plugins: ICapsulePluginItem[]): ICapsulePluginItem[] {
  const allPlugins = prePlugins.concat(plugins);
  return allPlugins;
}

export function filterHookPlugins(plugins: ICapsulePluginItem[], hook: ERecordPluginHook): ICapsulePluginItem[] {
  if (!hook) {
    return [];
  }
  const hasHookPlugins = plugins.filter(plugin => {
    return plugin.hooks?.[hook] && typeof plugin.hooks?.[hook] === 'function';
  });
  return hasHookPlugins;
}

export function executeParallelHook(plugins: ICapsulePluginItem[], hook: ERecordPluginHook, ...args: any[]): Promise<any> {
  const hooks = plugins.map(plugin => {
    // @ts-ignore
    return plugin.hooks?.[hook]?.call(null, ...args);
  });
  return Promise.all(hooks);
}