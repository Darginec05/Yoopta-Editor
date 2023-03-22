import { generateId, YoptaComponent } from '@yopta/editor';
import { Transforms } from 'slate';
import { Video as VideoRender } from './ui/Video';
import { VideoEditor } from './ui/VideoEditor';

const Video = new YoptaComponent({
  type: 'video',
  // renderer: (editor) => VideoRender,
  renderer: (editor) => VideoEditor,
  // editorRenderer: (editor) => VideoEditor,
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

export default Video;
