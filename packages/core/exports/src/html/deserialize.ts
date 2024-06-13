import { Element } from 'slate';
import {
  buildBlockData,
  SlateElement,
  YooEditor,
  YooptaBlockData,
  getRootBlockElementType,
  generateId,
  YooptaContentValue,
} from '@yoopta/editor';

type PluginDeserializeParser = any;

export function isYooptaBlock(block: any): boolean {
  return !!block && !!block.id && !!block.type && !!block.value && !!block.meta;
}

const MARKS_NODE_NAME_MATCHERS_MAP = {
  B: { type: 'bold' },
  STRONG: { type: 'bold' },
  I: { type: 'italic' },
  U: { type: 'underline' },
  S: { type: 'strike' },
  CODE: { type: 'code' },
  EM: { type: 'code' },
};

type PluginsMapByNodeNames = Record<string, { type: string; parse: PluginDeserializeParser['parse'] }>;

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

export function deserialize(editor: YooEditor, pluginsMap: PluginsMapByNodeNames, el: HTMLElement | ChildNode) {
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
    .map((node) => deserialize(editor, pluginsMap, node))
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

    let rootNode: SlateElement<string, any> | YooptaBlockData[] = {
      id: generateId(),
      type: rootElementType,
      children: isVoid && !block.hasCustomEditor ? [{ text: '' }] : children.map(mapNodeChildren),
      props: { nodeType: 'block', ...rootElement.props },
    };

    if (plugin.parse) {
      const nodeElementOrBlocks = plugin.parse(el as HTMLElement);

      if (nodeElementOrBlocks) {
        if (Element.isElement(nodeElementOrBlocks)) {
          rootNode = nodeElementOrBlocks;
        } else if (Array.isArray(nodeElementOrBlocks)) {
          const blocks = nodeElementOrBlocks;
          return blocks;
        }
      }
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

  return { text: '' };
}

export function deserializeHTML(editor: YooEditor, htmlString: string): YooptaContentValue {
  const parsedHtml = new DOMParser().parseFromString(htmlString, 'text/html');
  const value: YooptaContentValue = {};

  const PLUGINS_NODE_NAME_MATCHERS_MAP = getMappedPluginByNodeNames(editor);
  const blocks = deserialize(editor, PLUGINS_NODE_NAME_MATCHERS_MAP, parsedHtml.body).filter(
    isYooptaBlock,
  ) as YooptaBlockData[];

  blocks.forEach((block, i) => {
    const blockData = block;
    blockData.meta.order = i;
    value[block.id] = blockData;
  });

  return value;
}
