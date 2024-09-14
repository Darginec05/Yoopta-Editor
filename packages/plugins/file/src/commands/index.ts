import { Blocks, buildBlockData, Elements, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { FileElement, FileElementProps } from '../types';

type FileElementOptions = {
  props?: Omit<FileElementProps, 'nodeType'>;
};

type InsertFileOptions = FileElementOptions & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type FileCommands = {
  buildFileElements: (editor: YooEditor, options?: Partial<FileElementOptions>) => FileElement;
  insertFile: (editor: YooEditor, options?: Partial<InsertFileOptions>) => void;
  deleteFile: (editor: YooEditor, blockId: string) => void;
  updateFile: (editor: YooEditor, blockId: string, props: Partial<FileElementProps>) => void;
};

export const FileCommands: FileCommands = {
  buildFileElements: (editor: YooEditor, options = {}) => {
    const fileProps = options?.props ? { ...options.props, nodeType: 'void' } : { nodeType: 'void' };
    return { id: generateId(), type: 'file', children: [{ text: '', props: fileProps }] };
  },
  insertFile: (editor: YooEditor, options = {}) => {
    const { at, focus, props } = options;
    const file = FileCommands.buildFileElements(editor, { props });
    Blocks.insertBlock(editor, buildBlockData({ value: [file], type: 'File' }), { focus, at });
  },
  deleteFile: (editor: YooEditor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
  updateFile: (editor: YooEditor, blockId, props) => {
    Elements.updateElement(editor, blockId, { props });
  },
};
