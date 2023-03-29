import { generateId, getNodeByPath, YoptaPlugin } from '@yopta/editor';
import { Transforms } from 'slate';
import { Video as VideoRender } from './ui/Video';
import { VideoEditor } from './ui/VideoEditor';

const Video = new YoptaPlugin({
  type: 'video',
  renderer: {
    editor: VideoEditor,
    render: () => VideoRender,
  },
  // renderer: (editor) => VideoRender,
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
        const currentNode = getNodeByPath(editor, editor.selection?.anchor.path, 'highest');
        if (currentNode.type !== 'video' || !editor.selection) return;

        console.log('hotkeys.isEnter(event)', hotkeys.isEnter(event));

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

export default Video;
