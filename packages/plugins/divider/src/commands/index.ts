import { Blocks, buildBlockData, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { DividerElement, DividerElementProps } from '../types';

type DividerInsertOptions = DividerElementProps & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type DividerCommands = {
  buildDividerElements: (editor: YooEditor, options?: Partial<DividerElementProps>) => DividerElement;
  insertDivider: (editor: YooEditor, options?: Partial<DividerInsertOptions>) => void;
  deleteDivider: (editor: YooEditor, blockId: string) => void;
};

export const DividerCommands: DividerCommands = {
  buildDividerElements: (editor, options = {}) => {
    return {
      id: generateId(),
      type: 'divider',
      children: [{ text: '' }],
      props: { color: options.color || '#EFEFEE', theme: options.theme || 'solid', nodeType: 'void' },
    };
  },
  insertDivider: (editor, options = {}) => {
    const { at, focus } = options;

    const dividerElement = DividerCommands.buildDividerElements(editor);
    Blocks.insertBlock(editor, buildBlockData({ value: [dividerElement], type: 'Divider' }), { at, focus });
  },
  deleteDivider: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};
