import { createYoptaPlugin, generateId, getElementByPath, YoEditor } from '@yopta/editor';
import { Transforms } from 'slate';
import { VideoElement, VideoPluginOptions } from './types';
import { Video as VideoRender } from './ui/Video';
import { VideoEditor } from './ui/VideoEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: VideoElement;
  }
}

const Video = createYoptaPlugin<VideoPluginOptions, VideoElement>({
  type: 'video',
  renderer: {
    editor: VideoEditor,
    render: VideoRender,
  },
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === Video.getPlugin.type ? true : isVoid(element);
    };

    return editor;
  },
  events: {
    onKeyDown:
      (editor, { defaultNode, hotkeys }) =>
      (event) => {
        const currentNode = getElementByPath(editor, editor.selection?.anchor.path, 'highest');
        if (currentNode.type !== 'video' || !editor.selection) return;

        console.log('hotkeys.isEnter(event)', hotkeys.isEnter(event));

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          Transforms.insertNodes(editor, defaultNode, { mode: 'highest' });
          return;
        }
      },
  },
  defineElement: (): VideoElement => ({
    id: generateId(),
    type: 'video',
    nodeType: 'void',
    data: { url: null, size: { width: 'auto', height: 'auto' } },
    children: [{ text: '' }],
  }),
  createElement: function (editor) {
    Transforms.setNodes(editor, Video.getPlugin.defineElement(), {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => text,
      deserialize: (node) => '',
    },
    html: {
      serialize: (node) => {
        console.log('node', node);
        // [TODO] - change to <source /> and add format
        return `<video preload controls src="${node.data.url}" height="${node.data.size.height}" width="${node.data.size.width}"></video>`;
      },
      deserialize: (node) => '',
    },
  },
});

export default Video;
export { VideoElement };
