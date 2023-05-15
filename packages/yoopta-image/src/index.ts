import { generateId, getElementByPath, createYooptaPlugin, YoEditor } from '@yoopta/editor';
import { Transforms } from 'slate';
import { ImageElement, ImageElementData, ImagePluginOptions } from './types';
import { Image as ImageRender } from './ui/Image';
import { ImageEditorFactory } from './ui/ImageEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: ImageElement;
  }
}

const Image = createYooptaPlugin<ImagePluginOptions, ImageElement>({
  type: 'image',
  shortcut: 'image',
  renderer: {
    // @ts-ignore [TODO: fix types]
    editor: ImageEditorFactory,
    render: ImageRender,
  },
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === Image.getPlugin.type ? true : isVoid(element);
    };

    return editor;
  },
  events: {
    onKeyDown:
      (editor, { defaultNode, hotkeys }) =>
      (event) => {
        const currentNode = getElementByPath(editor, editor.selection?.anchor.path, 'highest');
        if (currentNode.type !== 'image' || !editor.selection) return;

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          Transforms.insertNodes(editor, defaultNode, { mode: 'highest' });
          return;
        }
      },
  },
  defineElement: (): ImageElement => ({
    id: generateId(),
    type: 'image',
    nodeType: 'void',
    data: { url: null, size: { width: 'auto', height: 'auto' } },
    children: [{ text: '' }],
  }),
  createElement: function (editor) {
    const node = Image.getPlugin.defineElement();

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, children) => {
        return `![${node.data.caption || ''}](${node.data.url})\n`;
      },
    },
    html: {
      serialize: (node, children) => {
        return `<img src="${node.data.url}" width="${node.data.size?.width}" height="${
          node.data.size?.height
        }" decoding="async" loading="lazy"  alt="${node.data.caption || 'yoopta-html-image'}" />`;
      },
      deserialize: {
        nodeName: 'IMG',
        parse: (el): Partial<ImageElementData> => ({
          url: el.getAttribute('src'),
          size: {
            height: typeof el.getAttribute('height') === 'string' ? Number(el.getAttribute('height')) : 'auto',
            width: typeof el.getAttribute('width') === 'string' ? Number(el.getAttribute('width')) : 'auto',
          },
        }),
      },
    },
  },
  options: {
    searchString: 'image picture',
    displayLabel: 'Image',
  },
});

export default Image;
export { ImageElement, ImageElementData, ImagePluginOptions };
