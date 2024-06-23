import { YooEditor, YooptaContentValue } from '../editor/types';
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
          innerHtml = childPlugin.parsers.html.serialize(child, serializeChildren(child.children, plugins));
          return innerHtml;
        }
      }

      return innerHtml;
    })
    .join('');
}

export function serializeHTML(editor: YooEditor, content: YooptaContentValue) {
  const blocks = Object.values(content)
    .filter((item) => editor.selectedBlocks?.includes(item.meta.order))
    .sort((a, b) => a.meta.order - b.meta.order);

  const html = blocks.map((blockData) => {
    const plugin = editor.plugins[blockData.type];

    if (plugin && plugin.parsers?.html?.serialize) {
      const content = serializeChildren(blockData.value[0].children, editor.plugins);
      return plugin.parsers.html.serialize(blockData.value[0], content);
    }

    return '';
  });

  return `<body id="yoopta-clipboard" data-editor-id="${editor.id}">${html.join('')}</body>`;
}
