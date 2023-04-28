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
  exports: {
    markdown: {
      serialize: (node, text) => {
        return `![${node.data.caption || ''}](${node.data.url})`;
      },
      deserialize: (node) => '',
    },
    html: {
      serialize: (node) => 'lolkek',
      deserialize: (node) => '',
    },
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
    data: { url: null, size: { width: 'auto', height: 'auto' } },
    children: [{ text: '' }],
  }),
  createElement: function (editor) {
    const node = Embed.getPlugin.defineElement();

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export default Embed;
export { EmbedElement, EmbedElementData, EmbedPluginOptions };
