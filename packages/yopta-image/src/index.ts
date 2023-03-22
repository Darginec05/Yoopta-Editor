import { generateId, getNodeByPath, YoptaComponent } from '@yopta/editor';
import { Transforms } from 'slate';
import { Image as ImageRender } from './ui/Image';
import { ImageEditor } from './ui/ImageEditor';

const Image = new YoptaComponent({
  type: 'image',
  renderer: ImageEditor,
  // renderer: (editor) => ImageRender,
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
      (editor, { defaultComponent, hotkeys }) =>
      (event) => {
        const currentNode = getNodeByPath(editor, editor.selection?.anchor.path, 'highest');
        if (currentNode.type !== 'image' || !editor.selection) return;

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          Transforms.insertNodes(editor, defaultComponent, { mode: 'highest' });
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
