import { YoptaBaseElement, YoptaPlugin, YoptaPluginType } from '@yoopta/editor';
import uniqWith from 'lodash.uniqwith';

export function mergePlugins(plugins): YoptaPluginType[] {
  const items: YoptaPluginType[] = plugins
    .map((instance) => {
      const { childPlugin, ...componentProps } = instance.getPlugin;
      return childPlugin ? [componentProps, { ...childPlugin.getPlugin, hasParent: true }] : componentProps;
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

export function mergePluginTypesToMapHMTLNodeName(
  plugins: YoptaPluginType<unknown, YoptaBaseElement<string>>[],
): Record<YoptaBaseElement<string>['type'], YoptaPluginType<any, YoptaBaseElement<string>>> {
  const yoptaPlugins = mergePlugins(plugins);

  const PLUGINS_MAP_HTML_NODE_NAMES = {};
  yoptaPlugins.forEach((plugin) => {
    if (plugin.exports?.html.deserialize?.nodeName) {
      if (Array.isArray(plugin.exports?.html.deserialize?.nodeName)) {
        plugin.exports?.html.deserialize?.nodeName.forEach((nodeName) => {
          PLUGINS_MAP_HTML_NODE_NAMES[nodeName] = plugin;
        });
        return;
      }

      PLUGINS_MAP_HTML_NODE_NAMES[plugin.exports?.html.deserialize?.nodeName] = plugin;
    }
  });
  return PLUGINS_MAP_HTML_NODE_NAMES;
}
