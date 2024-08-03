import { Element } from 'slate';
import {
  buildBlockData,
  SlateElement,
  YooEditor,
  YooptaBlockData,
  getRootBlockElementType,
  generateId,
  YooptaContentValue,
  PluginDeserializeParser,
} from '@yoopta/editor';

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
  EM: { type: 'italic' },
};

const VALID_TEXT_ALIGNS = ['left', 'center', 'right', undefined];

type PluginsMapByNode = {
  type: string;
  parse: PluginDeserializeParser['parse'];
};

type PluginsMapByNodeNames = Record<string, PluginsMapByNode | PluginsMapByNode[]>;

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
              const nodeNameMap = PLUGINS_NODE_NAME_MATCHERS_MAP[nodeName];

              if (nodeNameMap) {
                const nodeNameItem = Array.isArray(nodeNameMap) ? nodeNameMap : [nodeNameMap];
                PLUGINS_NODE_NAME_MATCHERS_MAP[nodeName] = [
                  ...nodeNameItem,
                  { type: pluginType, parse: deserialize.parse },
                ];
              } else {
                PLUGINS_NODE_NAME_MATCHERS_MAP[nodeName] = {
                  type: pluginType,
                  parse: deserialize.parse,
                };
              }
            });
          }
        }
      }
    }
  });

  return PLUGINS_NODE_NAME_MATCHERS_MAP;
}

function buildBlock(editor: YooEditor, plugin: PluginsMapByNode, el: HTMLElement, children: any[]) {
  let nodeElementOrBlocks;

  if (plugin.parse) {
    nodeElementOrBlocks = plugin.parse(el as HTMLElement, editor);

    const isInline = Element.isElement(nodeElementOrBlocks) && nodeElementOrBlocks.props?.nodeType === 'inline';
    if (isInline) return nodeElementOrBlocks;
  }

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

  if (nodeElementOrBlocks) {
    if (Element.isElement(nodeElementOrBlocks)) {
      rootNode = nodeElementOrBlocks;
    } else if (Array.isArray(nodeElementOrBlocks)) {
      const blocks = nodeElementOrBlocks;
      return blocks;
    }
  }

  if (rootNode.children.length === 0) {
    rootNode.children = [{ text: '' }];
  }

  if (!nodeElementOrBlocks && plugin.parse) return;

  const align = el.getAttribute('data-meta-align') as YooptaBlockData['meta']['align'];
  const depth = parseInt(el.getAttribute('data-meta-depth') || '0', 10);

  const blockData = buildBlockData({
    id: generateId(),
    type: plugin.type,
    value: [rootNode],
    meta: {
      order: 0,
      depth,
      align: VALID_TEXT_ALIGNS.includes(align) ? align : undefined,
    },
  });

  return blockData;
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

  const plugin = pluginsMap[el.nodeName];

  if (plugin) {
    if (Array.isArray(plugin)) {
      const blocks = plugin.map((p) => buildBlock(editor, p, el as HTMLElement, children)).filter(Boolean);
      return blocks;
    }

    return buildBlock(editor, plugin, el as HTMLElement, children);
  }

  return children;
}

function mapNodeChildren(child) {
  if (typeof child === 'string') {
    return { text: child };
  }

  if (Element.isElement(child)) {
    return child;
  }

  if (Array.isArray(child)) {
    return { text: child[0] };
  }

  if (child?.text) {
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
