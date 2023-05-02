import { generateId, getElementByPath, createYoptaPlugin, YoEditor } from '@yopta/editor';
import { Transforms } from 'slate';
import { EmbedElement, EmbedElementData, EmbedPluginOptions } from './types';
import { Embed as EmbedRender } from './ui/Embed';
import { EmbedEditor } from './ui/EmbedEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: EmbedElement;
  }
}

const Embed = createYoptaPlugin<EmbedPluginOptions, EmbedElement>({
  type: 'embed',
  shortcut: 'embed',
  renderer: {
    editor: EmbedEditor,
    render: EmbedRender,
  },
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === Embed.getPlugin.type ? true : isVoid(element);
    };

    return editor;
  },
  events: {
    onKeyDown:
      (editor, { defaultNode, hotkeys }) =>
      (event) => {
        const currentNode = getElementByPath(editor, editor.selection?.anchor.path, 'highest');
        if (currentNode.type !== 'embed' || !editor.selection) return;

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          Transforms.insertNodes(editor, defaultNode, { mode: 'highest' });
          return;
        }
      },
  },
  defineElement: (): EmbedElement => ({
    id: generateId(),
    type: 'embed',
    nodeType: 'void',
    data: { url: null, size: { width: 'auto', height: 'auto' }, providerId: null },
    children: [{ text: '' }],
  }),
  createElement: function (editor) {
    const node = Embed.getPlugin.defineElement();

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => {
        return `[embed-url](${node.data.url})\n`;
      },
      deserialize: (node) => '',
    },
    html: {
      serialize: (node, children) => {
        return `<iframe src="https://player.vimeo.com/video/807053663?badge=0&amp;byline=0&amp;portrait=0&amp;title=0" frameborder="0" height="${
          node.data.size?.height
        }" width="${node.data.size?.width}" allowfullscreen="" url="https://vimeo.com/807053663" provider="${
          node.data.provider || ''
        }" />`;
      },
      deserialize: {
        nodeName: 'IFRAME',
        parse: (el): Partial<EmbedElementData> => ({
          url: el.getAttribute('src'),
          size: {
            height: typeof el.getAttribute('height') === 'string' ? Number(el.getAttribute('height')) : 'auto',
            width: typeof el.getAttribute('width') === 'string' ? Number(el.getAttribute('width')) : 'auto',
          },
        }),
      },
    },
  },
});

export default Embed;
export { EmbedElement, EmbedElementData, EmbedPluginOptions };
