import { YooEditor, YooptaBlockData, SlateElement, YooptaContentValue } from '@yoopta/editor';

export function serialize(editor: YooEditor, blocksData: YooptaBlockData[]) {
  const blocks = blocksData.sort((a, b) => (a.meta.order > b.meta.order ? 1 : -1));

  const html = blocks.map((blockData) => {
    const plugin = editor.plugins[blockData.type];

    if (plugin) {
      const element = blockData.value[0] as SlateElement;

      if (plugin.parsers?.html?.serialize) {
        const serialized = plugin.parsers.html.serialize(element, element.children.map((child) => child.text).join(''));
        if (serialized) return serialized;
      }
    }

    return '';
  });

  return `<body id="yoopta-clipboard">${html.join('')}</body>`;
}

export function serializeHTML(editor: YooEditor, content: YooptaContentValue) {
  const selectedBlocks = Object.values(content);
  return serialize(editor, selectedBlocks);
}
