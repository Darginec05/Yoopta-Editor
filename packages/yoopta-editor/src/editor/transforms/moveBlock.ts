export function moveBlock(editor, from: number[], to: number[]) {
  const plugins = editor.children;
  const updatedPlugins = plugins;

  const [fromPosition] = from;
  const [toPosition] = to;

  const fromId = Object.keys(updatedPlugins).find((id) => updatedPlugins[id].meta.order === fromPosition);
  const toId = Object.keys(updatedPlugins).find((id) => updatedPlugins[id].meta.order === toPosition);

  const blockFrom = updatedPlugins[fromId || ''];
  const blockTo = updatedPlugins[toId || ''];

  if (blockFrom && blockTo) {
    blockFrom.meta.order = toPosition;
    blockTo.meta.order = fromPosition;
  }

  editor.children = updatedPlugins;
}
