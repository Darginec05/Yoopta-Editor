import { Descendant, Text } from 'slate';
import { mergePluginTypesToMap } from '../utils/mergePlugins';

const serializeNode = (node, pluginsMap) => {
  if (Text.isText(node)) {
    return node.text;
  }

  const children = node.children.map((n) => serializeNode(n, pluginsMap)).join('');
  const plugin = pluginsMap[node.type];

  const serializeFn = plugin.exports?.markdown?.serialize;

  if (typeof serializeFn === 'function') {
    return `${serializeFn(node, children)}\n`;
  }

  return `\n${children}\n`;
};

export function serializeMarkdown(data: Descendant[], plugins) {
  const pluginsMap = mergePluginTypesToMap(plugins);
  const html = data.map((node) => serializeNode(node, pluginsMap)).join('');
  return html;
}
