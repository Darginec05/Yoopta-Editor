import { Blocks, buildBlockData, generateId, PluginCommands } from '@yoopta/editor';
import { ParagraphElement } from '../types';

export const ParagraphCommands: PluginCommands<'Paragraph'> = {
  buildParagraphElements: (editor, options) => {
    return { id: generateId(), type: 'paragraph', children: [{ text: 'Lolkek' }] };
  },
  insertParagraph: (editor, options) => {
    const paragraphElement = ParagraphCommands.buildParagraphElements(editor, options);
    Blocks.insertBlock(editor, buildBlockData({ value: [paragraphElement], type: 'Table' }));
  },
  deleteParagraph: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};
