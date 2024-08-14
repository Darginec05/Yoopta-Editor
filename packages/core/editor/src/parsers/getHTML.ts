import { BaseText, Descendant } from 'slate';
import { SlateElement, YooEditor, YooptaContentValue } from '../editor/types';
import { getPluginByInlineElement } from '../utils/blockElements';

const MARKS_NODE_NAME_MATCHERS_MAP = {
  underline: { type: 'underline', tag: 'U' },
  strike: { type: 'strike', tag: 'S' },
  code: { type: 'code', tag: 'CODE' },
  italic: { type: 'italic', tag: 'I' },
  bold: { type: 'bold', tag: 'B' },
};

function serializeChildren(children, plugins) {
  return children
    .map((child) => {
      let innerHtml = '';

      if (child.text) {
        innerHtml = Object.keys(MARKS_NODE_NAME_MATCHERS_MAP).reduce((acc, mark) => {
          if (child[mark]) {
            return `<${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag}>${acc}</${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag}>`;
          }
          return acc;
        }, child.text);

        return innerHtml;
      } else if (child.type) {
        const childPlugin = getPluginByInlineElement(plugins, child.type);

        if (childPlugin && childPlugin.parsers?.html?.serialize) {
          // We don't pass block meta data to this because it's inline element inside block
          innerHtml = childPlugin.parsers.html.serialize(child, serializeChildren(child.children, plugins));
          return innerHtml;
        }
      }

      return innerHtml;
    })
    .join('');
}

export function getHTML(editor: YooEditor, content: YooptaContentValue): string {
  const blocks = Object.values(content)
    .filter((item) => {
      if (Array.isArray(editor.selectedBlocks) && editor.selectedBlocks.length > 0) {
        return editor.selectedBlocks?.includes(item.meta.order);
      }

      return true;
    })
    .sort((a, b) => a.meta.order - b.meta.order);

  const html = blocks.map((blockData) => {
    const plugin = editor.plugins[blockData.type];

    if (plugin && plugin.parsers?.html?.serialize) {
      const content = serializeChildren((blockData.value[0] as SlateElement).children, editor.plugins);
      return plugin.parsers.html.serialize(blockData.value[0] as SlateElement, content, blockData.meta);
    }

    return '';
  });

  return `<body id="yoopta-clipboard" data-editor-id="${editor.id}">${html.join('')}</body>`;
}
