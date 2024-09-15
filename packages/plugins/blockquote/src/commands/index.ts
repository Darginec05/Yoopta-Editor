import { Blocks, buildBlockData, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { BlockquoteElement } from '../types';

type BlockquoteElementOptions = {
  text?: string;
};

export type InsertBlockquoteOptions = {
  text?: string;
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type BlockquoteCommands = {
  buildBlockquoteElements: (editor: YooEditor, options?: Partial<BlockquoteElementOptions>) => BlockquoteElement;
  insertBlockquote: (editor: YooEditor, options?: Partial<InsertBlockquoteOptions>) => void;
  deleteBlockquote: (editor: YooEditor, blockId: string) => void;
};

export const BlockquoteCommands: BlockquoteCommands = {
  buildBlockquoteElements: (editor, options = {}) => {
    return { id: generateId(), type: 'blockquote', children: [{ text: options?.text || '' }] };
  },
  insertBlockquote: (editor, options = {}) => {
    const { at, focus, text } = options;

    const blockquote = BlockquoteCommands.buildBlockquoteElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [blockquote], type: 'Blockquote' }), { at, focus });
  },
  deleteBlockquote: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};
