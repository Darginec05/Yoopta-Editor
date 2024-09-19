import { Blocks, buildBlockData, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { DividerElement } from '../types';

type DividerElementOptions = {
  text?: string;
};

type DividerInsertOptions = DividerElementOptions & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type DividerCommands = {
  buildDividerElements: (editor: YooEditor, options?: Partial<DividerElementOptions>) => DividerElement;
  insertDivider: (editor: YooEditor, options?: Partial<DividerInsertOptions>) => void;
  deleteDivider: (editor: YooEditor, blockId: string) => void;
};

export const DividerCommands: DividerCommands = {
  buildDividerElements: (editor, options = {}) => {
    return { id: generateId(), type: 'divider', children: [{ text: options?.text || '' }] };
  },
  insertDivider: (editor, options = {}) => {
    const { at, focus, text } = options;

    const dividerElement = DividerCommands.buildDividerElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [dividerElement], type: 'Divider' }), { at, focus });
  },
  deleteDivider: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};
