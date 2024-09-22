import { Blocks, buildBlockData, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { ParagraphElement } from '../types';

type ParagraphElementOptions = {
  text?: string;
};

type ParagraphInsertOptions = ParagraphElementOptions & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type ParagraphCommands = {
  buildParagraphElements: (editor: YooEditor, options?: Partial<ParagraphElementOptions>) => ParagraphElement;
  insertParagraph: (editor: YooEditor, options?: Partial<ParagraphInsertOptions>) => void;
  deleteParagraph: (editor: YooEditor, blockId: string) => void;
};

export const ParagraphCommands: ParagraphCommands = {
  buildParagraphElements: (editor, options = {}) => {
    return { id: generateId(), type: 'paragraph', children: [{ text: options?.text || '' }] };
  },
  insertParagraph: (editor, options = {}) => {
    const { at, focus, text } = options;

    const paragraphElement = ParagraphCommands.buildParagraphElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [paragraphElement], type: 'Paragraph' }), { at, focus });
  },
  deleteParagraph: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};
