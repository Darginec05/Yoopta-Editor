import { YoptaBaseElement, YoptaPlugin, YoptaPluginType } from '@yopta/editor';
import uniqWith from 'lodash.uniqwith';

export function mergePlugins(plugins): YoptaPluginType[] {
  const items: YoptaPluginType[] = plugins
    .map((instance) => {
      const { childPlugin, ...componentProps } = instance.getPlugin;
      return childPlugin ? [componentProps, { ...childPlugin.getPlugin, isChild: true }] : componentProps;
    })
    .flat();

  const uniquePlugins = uniqWith(items, (a, b) => a.type === b.type);
  return uniquePlugins;
}

export function mergePluginTypesToMap(
  plugins: YoptaPluginType<unknown, YoptaBaseElement<string>>[],
): Record<YoptaBaseElement<string>['type'], YoptaPluginType<any, YoptaBaseElement<string>>> {
  const yoptaPlugins = mergePlugins(plugins);

  const PLUGINS_MAP = {};
  yoptaPlugins.forEach((plugin) => (PLUGINS_MAP[plugin.type] = plugin));
  return PLUGINS_MAP;
}
