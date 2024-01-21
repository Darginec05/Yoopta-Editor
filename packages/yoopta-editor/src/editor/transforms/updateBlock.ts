export function updateBlock(editor, data, options) {
  const { at } = options;

  const [position] = at;
  const plugins = editor.children;
  const pluginKeys = Object.keys(plugins);
  const pluginToUpdateId = pluginKeys.find((id) => plugins[id].meta.order === position);

  if (pluginToUpdateId) {
    plugins[pluginToUpdateId].value = data.value;
    plugins[pluginToUpdateId].type = data.type;
    plugins[pluginToUpdateId].meta = {
      ...plugins[pluginToUpdateId].meta,
      ...data.meta,
    };
  }

  return plugins;
}
