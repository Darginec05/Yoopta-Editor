import { YooEditor, YooptaBlockData, SlateElement } from '../editor/types';

export function serializeHTML(editor: YooEditor, blocksData: YooptaBlockData[]) {
  const blocks = blocksData.sort((a, b) => (a.meta.order > b.meta.order ? 1 : -1));

  const html = blocks.map((blockData) => {
    const plugin = editor.plugins[blockData.type];

    if (plugin) {
      const element = blockData.value[0] as SlateElement;
      console.log('blockData.value', blockData.value);
      console.log('element', element);

      if (plugin.parsers?.html?.serialize) {
        return plugin.parsers.html.serialize(element, element.children.map((child) => child.text).join(''));
      }
    }

    return '';
  });

  return `<body>${html.join('')}</body>`;
}
