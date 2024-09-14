import { Blocks, buildBlockData, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { HeadingOneElement, HeadingThreeElement, HeadingTwoElement } from '../types';

export type HeadingElementOptions = { text?: string };
export type HeadingInsertOptions = HeadingElementOptions & { at: YooptaBlockPath; focus?: boolean };

export type HeadingOneCommands = {
  buildHeadingOneElements: (editor: YooEditor, options?: Partial<HeadingElementOptions>) => HeadingOneElement;
  insertHeadingOne: (editor: YooEditor, options?: Partial<HeadingInsertOptions>) => void;
  deleteHeadingOne: (editor: YooEditor, blockId: string) => void;
};

export const HeadingOneCommands: HeadingOneCommands = {
  buildHeadingOneElements: (editor, options) => {
    return { id: generateId(), type: 'heading-one', children: [{ text: options?.text || '' }] };
  },
  insertHeadingOne: (editor, options = {}) => {
    const { at, focus, text } = options;
    const headingOne = HeadingOneCommands.buildHeadingOneElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [headingOne], type: 'HeadingOne' }), { at, focus });
  },
  deleteHeadingOne: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};

export type HeadingTwoCommands = {
  buildHeadingTwoElements: (editor: YooEditor, options?: Partial<HeadingElementOptions>) => HeadingTwoElement;
  insertHeadingTwo: (editor: YooEditor, options?: Partial<HeadingInsertOptions>) => void;
  deleteHeadingTwo: (editor: YooEditor, blockId: string) => void;
};

export const HeadingTwoCommands: HeadingTwoCommands = {
  buildHeadingTwoElements: (editor, options) => {
    return { id: generateId(), type: 'heading-two', children: [{ text: options?.text || '' }] };
  },
  insertHeadingTwo: (editor, options = {}) => {
    const { at, focus, text } = options;
    const headingTwo = HeadingTwoCommands.buildHeadingTwoElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [headingTwo], type: 'HeadingTwo' }), { at, focus });
  },
  deleteHeadingTwo: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};

export type HeadingThreeCommands = {
  buildHeadingThreeElements: (editor: YooEditor, options?: Partial<HeadingElementOptions>) => HeadingThreeElement;
  insertHeadingThree: (editor: YooEditor, options?: Partial<HeadingInsertOptions>) => void;
  deleteHeadingThree: (editor: YooEditor, blockId: string) => void;
};

export const HeadingThreeCommands: HeadingThreeCommands = {
  buildHeadingThreeElements: (editor, options?) => {
    return { id: generateId(), type: 'heading-three', children: [{ text: options?.text || '' }] };
  },
  insertHeadingThree: (editor, options = {}) => {
    const { at, focus, text } = options;
    const headingThree = HeadingThreeCommands.buildHeadingThreeElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [headingThree], type: 'HeadingThree' }), { at, focus });
  },
  deleteHeadingThree: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
};
