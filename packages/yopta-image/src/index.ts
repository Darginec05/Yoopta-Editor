import { generateId, getElementByPath, createYoptaPlugin, YoEditor } from '@yopta/editor';
import { Transforms } from 'slate';
import { ImageElement, ImageOptions } from './types';
import { Image as ImageRender } from './ui/Image';
import { ImageEditor } from './ui/ImageEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: ImageElement;
  }
}

const Image = createYoptaPlugin<ImageOptions, ImageElement>({
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
  element: {
    isVoid: true,
    type: 'block',
  },
  handlers: {
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
  createNode: (editor, type, data) => {
    const node = {
      id: generateId(),
      type,
      url: null,
      ...data,
    };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export default Image;
export { ImageElement, ImageOptions };
