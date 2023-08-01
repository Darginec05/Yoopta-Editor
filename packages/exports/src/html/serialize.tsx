import { Descendant, Text } from 'slate';
import { mergePluginTypesToMap } from '../utils/mergePlugins';

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function serializeNode(node, plugins) {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children = node.children.map((node) => serializeNode(node, plugins)).join('');

  const plugin = plugins[node.type];

  if (typeof plugin.exports?.html?.serialize === 'function') {
    return plugin.exports.html.serialize(node, children);
  }

  return children;
}

export function serializeHtml(data: Descendant[], plugins) {
  const pluginsMap = mergePluginTypesToMap(plugins);
  const html = data.map((node) => serializeNode(node, pluginsMap)).join('');
  return html;
}
