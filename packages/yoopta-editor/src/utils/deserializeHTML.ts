import { Editor, Element, Node, Text } from 'slate';
import { jsx } from 'slate-hyperscript';
import { YooptaBaseElement } from '../types';
import { YooptaPluginType } from './plugins';

const TEXT_FORMAT_TAGS = {
  // CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

// Sometimes when you copy/paste from external resources, the HTML is not well formatted and deserialize function will return a list of Text nodes.
// This function will check if all nodes are Text nodes or Inline nodes.
const isAllInlineOrTextNodes = (nodes: Node[]): boolean => {
  return nodes.every(
    (item) => (Text.isText(item) && item.text.length > 0) || (Element.isElement(item) && item.nodeType === 'inline'),
  );
};

const deserialize = (
  el: HTMLElement | ChildNode,
  pluginsMap: Record<YooptaBaseElement<string>['type'], YooptaPluginType<any, YooptaBaseElement<string>>>,
) => {
  if (el.nodeType === 3) {
    return el.textContent?.replace(/[\t\n\r\f\v]+/g, ' ');
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;

  let parent = el;

  let children = Array.from(parent.childNodes)
    .map((node) => deserialize(node, pluginsMap))
    .flat();

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (pluginsMap[nodeName]) {
    const plugin = pluginsMap[nodeName];

    if (plugin) {
      let node = plugin.defineElement();

      if (typeof plugin.exports?.html.deserialize?.parse === 'function') {
        const data = plugin.exports?.html.deserialize?.parse(el as HTMLElement);
        node = { ...node, data };
      }

      return jsx('element', node, children);
    }
  }

  if (Text.isTextList(children)) {
    children = children.filter((child) => child.text !== '');
    if (children.length > 0) return jsx('element', pluginsMap.P.defineElement(), children);
  }

  if (TEXT_FORMAT_TAGS[nodeName]) {
    const attrs = TEXT_FORMAT_TAGS[nodeName](el);
    const textNodes = children.map((child) => (Text.isText(child) ? jsx('text', attrs, child) : child));
    return textNodes;
  }

  return children;
};

export function mergePluginTypesToMapHMTLNodeName(
  plugins: Record<YooptaBaseElement<string>['type'], YooptaPluginType<any, YooptaBaseElement<string>>>,
): Record<YooptaBaseElement<string>['type'], YooptaPluginType<any, YooptaBaseElement<string>>> {
  const PLUGINS_MAP_HTML_NODE_NAMES = {};
  Object.keys(plugins).forEach((pluginKey) => {
    const plugin = plugins[pluginKey];
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

export function deserializeHtml(
  htmlString: string,
  plugins: Record<YooptaBaseElement<string>['type'], YooptaPluginType<any, YooptaBaseElement<string>>>,
) {
  try {
    const pluginsMap = mergePluginTypesToMapHMTLNodeName(plugins);
    const parsedHtml = new DOMParser().parseFromString(htmlString, 'text/html');

    const deserialized = deserialize(parsedHtml.body, pluginsMap);
    if (isAllInlineOrTextNodes(deserialized)) {
      return [jsx('element', pluginsMap.P.defineElement(), deserialized)];
    }

    return deserialized.filter((node) => !Text.isText(node));
  } catch (error) {
    console.error(error);
    return null;
  }
}
