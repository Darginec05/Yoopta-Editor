export function deleteBlock(editor, at: number[]) {
  const [position] = at;
  const updatedPlugins = editor.children;
  const pluginKeys = Object.keys(updatedPlugins);
  const pluginToDeleteId = pluginKeys.find((id) => updatedPlugins[id].meta.order === position);

  pluginKeys.forEach((pluginId) => {
    const plugin = updatedPlugins[pluginId];
    if (plugin.meta.order > position) plugin.meta.order -= 1;
  });

  if (pluginToDeleteId) delete updatedPlugins[pluginToDeleteId];

  return updatedPlugins;
}
