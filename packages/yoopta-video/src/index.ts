import { createYooptaPlugin, generateId, getElementByPath, YooEditor } from '@yoopta/editor';
import { Transforms } from 'slate';
import { VideoElement, VideoElementData, VideoPluginOptions } from './types';
import { Video as VideoRender } from './ui/Video';
import { VideoEditorFactory } from './ui/VideoEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: VideoElement;
  }
}

const Video = createYooptaPlugin<VideoPluginOptions, VideoElement>({
  type: 'video',
  renderer: {
    // @ts-ignore [TODO: fix types]
    editor: VideoEditorFactory,
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
  createElement: (editor, elementData) => {
    const node: VideoElement = { ...Video.getPlugin.defineElement(), ...elementData };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => {
        return `<video preload controls src="${node.data.url}" height="${node.data.size.height}" width="${node.data.size.width}"></video>\n`;
      },
    },
    html: {
      serialize: (node) => {
        // [TODO] - change to <source /> and add format
        return `<video preload controls src="${node.data.url}" height="${node.data.size.height}" width="${node.data.size.width}"></video>`;
      },
      deserialize: {
        nodeName: 'VIDEO',
        parse: (el): Partial<VideoElementData> => ({
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
    searchString: 'video media',
    displayLabel: 'Video',
  },
});

export default Video;
export { VideoElement };
