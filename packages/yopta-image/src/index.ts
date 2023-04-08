import { generateId, getElementByPath, createYoptaPlugin, YoEditor } from '@yopta/editor';
import { Transforms } from 'slate';
import { ImageElement, ImageElementData, ImagePluginOptions } from './types';
import { Image as ImageRender } from './ui/Image';
import { ImageEditor } from './ui/ImageEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: ImageElement;
  }
}

const Image = createYoptaPlugin<ImagePluginOptions, ImageElement>({
  type: 'image',
  renderer: {
    editor: ImageEditor,
    render: () => ImageRender,
  },
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === this.type ? true : isVoid(element);
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
  getElement: (): ImageElement => ({
    id: generateId(),
    type: 'image',
    nodeType: 'void',
    data: { url: null, size: { width: 'auto', height: 'auto' } },
    children: [{ text: '' }],
  }),
  createElement: function (editor) {
    const node = this.getElement();

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export default Image;
export { ImageElement, ImageElementData, ImagePluginOptions };
