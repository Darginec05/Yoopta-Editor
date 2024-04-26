export function buildPlugins(plugins: any[]): Record<string, any> {
  const pluginsMap = {};
  const inlineTopLevelPlugins = {};

  plugins.forEach((instance) => {
    const plugin = instance.getPlugin;

    if (plugin.elements) {
      Object.keys(plugin.elements).forEach((type) => {
        const element = plugin.elements[type];
        const nodeType = element.props?.nodeType;

        if (nodeType === 'inline' || nodeType === 'inlineVoid') {
          inlineTopLevelPlugins[type] = element;
        }
      });
    }

    pluginsMap[plugin.type] = plugin;
  });

  plugins.forEach((instance) => {
    const plugin = instance.getPlugin;

    if (plugin.elements) {
      const elements = { ...plugin.elements, ...inlineTopLevelPlugins };
      pluginsMap[plugin.type] = { ...plugin, elements };
    }
  });

  return pluginsMap;
}
