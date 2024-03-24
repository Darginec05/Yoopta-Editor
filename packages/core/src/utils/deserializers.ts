import { buildBlockData } from '../components/Editor/utils';
import { SlateElement, YooEditor, YooptaBlockData } from '../editor/types';
import { PluginParsers } from '../plugins/types';
import { getRootBlockElementType } from './blockElements';
import { generateId } from './generateId';
import { isYooptaBlock } from './validators';

const MARKS_NODE_NAME_MATCHERS_MAP = {
  B: { type: 'bold' },
  STRONG: { type: 'bold' },
  I: { type: 'italic' },
  U: { type: 'underline' },
  S: { type: 'strike' },
  CODE: { type: 'code' },
  EM: { type: 'code' },
};

type PluginsMapByNodeNames = Record<string, { type: string; parse: PluginParsers['parse'] }>;

function getMappedPluginByNodeNames(editor: YooEditor): PluginsMapByNodeNames {
  const PLUGINS_NODE_NAME_MATCHERS_MAP: PluginsMapByNodeNames = {};

  Object.keys(editor.plugins).forEach((pluginType) => {
    const plugin = editor.plugins[pluginType];
    const { parsers } = plugin;

    if (parsers) {
      const { html } = parsers;

      if (html) {
        const { deserialize } = html;

        if (deserialize) {
          const { nodeNames } = deserialize;
          if (nodeNames) {
            nodeNames.forEach((nodeName) => {
              PLUGINS_NODE_NAME_MATCHERS_MAP[nodeName] = {
                type: pluginType,
                parse: deserialize.parse,
              };
            });
          }
        }
      }
    }
  });

  return PLUGINS_NODE_NAME_MATCHERS_MAP;
}

export function deserializeHTML(editor: YooEditor, pluginsMap: PluginsMapByNodeNames, el: HTMLElement | ChildNode) {
  if (el.nodeType === 3) {
    const text = el.textContent?.replace(/[\t\n\r\f\v]+/g, ' ');
    return text;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const parent = el;

  let children = Array.from(parent.childNodes)
    .map((node) => deserializeHTML(editor, pluginsMap, node))
    .flat();

  if (MARKS_NODE_NAME_MATCHERS_MAP[el.nodeName]) {
    const mark = MARKS_NODE_NAME_MATCHERS_MAP[el.nodeName];
    const markType = mark.type;
    const text = el.textContent?.replace(/[\t\n\r\f\v]+/g, ' ');
    return { [markType]: true, text };
  }

  if (pluginsMap[el.nodeName]) {
    const plugin = pluginsMap[el.nodeName];
    const block = editor.blocks[plugin.type];
    const rootElementType = getRootBlockElementType(block.elements) || '';
    const rootElement = block.elements[rootElementType];

    const isVoid = rootElement.props?.nodeType === 'void';

    let rootNode: SlateElement<string, any> = {
      id: generateId(),
      type: rootElementType,
      children: isVoid && !block.hasCustomEditor ? [{ text: '' }] : children.map(mapNodeChildren),
      props: { nodeType: 'block', ...rootElement.props },
    };

    if (plugin.parse) {
      const nodeElement = plugin.parse(el as HTMLElement);
      if (nodeElement) rootNode = nodeElement;
    }

    if (rootNode.children.length === 0) {
      rootNode.children = [{ text: '' }];
    }

    const blockData = buildBlockData({
      id: generateId(),
      type: plugin.type,
      value: [rootNode],
      meta: {
        order: 0,
        depth: 0,
      },
    });

    return blockData;
  }

  return children;
}

function mapNodeChildren(child) {
  if (typeof child === 'string') {
    return { text: child };
  }

  if (Array.isArray(child)) {
    return { text: child[0] };
  }

  if (child.text) {
    return child;
  }

  if (isYooptaBlock(child)) {
    const block = child as YooptaBlockData;
    let text = '';

    block.value[0].children.forEach((child) => {
      text += `${child.text}`;
    });

    return { text };
  }

  return { text: '\n' };
}

function deserializeMarkdown() {}

export const deserializers = {
  html: (editor: YooEditor, el: HTMLElement) => {
    const PLUGINS_NODE_NAME_MATCHERS_MAP = getMappedPluginByNodeNames(editor);
    return deserializeHTML(editor, PLUGINS_NODE_NAME_MATCHERS_MAP, el).filter(isYooptaBlock) as YooptaBlockData[];
  },
  markdown: (editor: YooEditor) => {
    return deserializeMarkdown();
  },
};
