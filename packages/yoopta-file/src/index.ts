import { generateId, getElementByPath, YooptaPlugin, YooEditor } from '@yoopta/editor';
import { Transforms } from 'slate';
import { FileElement, FileElementData, FilePluginOptions } from './types';
import { File as FileRender } from './ui/File';
import { FileEditorFactory } from './ui/FileEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: FileElement;
  }
}

const File = new YooptaPlugin<FilePluginOptions, FileElement>({
  type: 'file',
  shortcuts: 'file',
  renderer: {
    // @ts-ignore [TODO: fix types]
    editor: FileEditorFactory,
    render: FileRender,
  },
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === File.getPlugin.type ? true : isVoid(element);
    };

    return editor;
  },
  events: {
    onKeyDown:
      (editor, { defaultNode, hotkeys }) =>
      (event) => {
        const currentNode = getElementByPath(editor, editor.selection?.anchor.path, 'highest');
        if (currentNode.type !== 'file' || !editor.selection) return;

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          Transforms.insertNodes(editor, defaultNode, { mode: 'highest' });
          return;
        }
      },
  },
  defineElement: (): FileElement => ({
    id: generateId(),
    type: 'file',
    nodeType: 'void',
    data: { url: null, name: '', size: 0 },
    children: [{ text: '' }],
  }),
  createElement: (editor, elementData) => {
    const node: FileElement = { ...File.getPlugin.defineElement(), ...elementData };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, children) => {
        return `![${node.data.name || ''}](${node.data.url})\n`;
      },
    },
    html: {
      serialize: (node, children) => {
        return `<div><a href="${node.data.url}" target="_blank" rel="noopener noreferrer">${node.data.name}</a></div>`;
      },
      // [TODO] - research how to deserialize html for file
      // deserialize: {
      //   nodeName: 'A',
      //   parse: (el) => {
      //     return {
      //       url: el.getAttribute('href'),
      //       name: el.textContent as string,
      //     };
      //   },
      // },
    },
  },
  options: {
    searchString: 'file url',
    display: {
      title: 'File',
    },
  },
});

export default File;
export { FileElement, FileElementData, FilePluginOptions };
