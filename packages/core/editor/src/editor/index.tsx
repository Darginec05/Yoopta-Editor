import { insertBlock } from './blocks/insertBlock';
import { deleteBlock } from './blocks/deleteBlock';
import { moveBlock } from './blocks/moveBlock';
import { focusBlock } from './blocks/focusBlock';
import { splitBlock } from './blocks/splitBlock';
import { setSelection } from './selection/setSelection';
import { YooEditor, YooptaContentValue } from './types';
import { increaseBlockDepth } from './blocks/increaseBlockDepth';
import { decreaseBlockDepth } from './blocks/decreaseBlockDepth';
import { getEditorValue } from './core/getEditorValue';
import { setEditorValue } from './core/setEditorValue';
import { setBlockSelected } from './selection/setBlockSelected';
import { duplicateBlock } from './blocks/duplicateBlock';
import { insertBlocks } from './blocks/insertBlocks';
import { updateBlock } from './blocks/updateBlock';
import { toggleBlock } from './blocks/toggleBlock';
import { blur } from './core/blur';
import { focus } from './core/focus';
import { isFocused } from './core/isFocused';
import { deleteBlocks } from './blocks/deleteBlocks';
import { getBlock } from './blocks/getBlock';
import { getHTML } from '../parsers/getHTML';
import { getMarkdown } from '../parsers/getMarkdown';
import { getPlainText } from '../parsers/getPlainText';
import { isEmpty } from './core/isEmpty';

export const createYooptaEditor = (): YooEditor => {
  const editor: YooEditor = {
    id: '',
    children: {},
    selection: null,
    selectedBlocks: null,
    readOnly: false,
    isEmpty: () => isEmpty(editor),
    getEditorValue: () => getEditorValue(editor),
    setEditorValue: (...args) => setEditorValue(editor, ...args),
    applyChanges: () => {},
    insertBlock: (...args) => insertBlock(editor, ...args),
    insertBlocks: (...args) => insertBlocks(editor, ...args),
    deleteBlocks: (...args) => deleteBlocks(editor, ...args),
    deleteBlock: (...args) => deleteBlock(editor, ...args),
    duplicateBlock: (...args) => duplicateBlock(editor, ...args),
    toggleBlock: (...args) => toggleBlock(editor, ...args),
    increaseBlockDepth: (...args) => increaseBlockDepth(editor, ...args),
    decreaseBlockDepth: (...args) => decreaseBlockDepth(editor, ...args),
    moveBlock: (...args) => moveBlock(editor, ...args),
    focusBlock: (...args) => focusBlock(editor, ...args),
    getBlock: (...args) => getBlock(editor, ...args),
    updateBlock: (...args) => updateBlock(editor, ...args),
    splitBlock: (...args) => splitBlock(editor, ...args),
    setSelection: (...args) => setSelection(editor, ...args),
    setBlockSelected: (...args) => setBlockSelected(editor, ...args),
    blockEditorsMap: {},
    blocks: {},
    formats: {},
    shortcuts: {},
    plugins: {},

    on: (event, callback) => {},
    off: (event, callback) => {},
    emit: (event, ...args) => {},
    once: (event, callback) => {},

    isFocused: () => isFocused(editor),
    focus: () => focus(editor),
    blur: (...args) => blur(editor, ...args),

    getHTML: (content: YooptaContentValue) => getHTML(editor, content),
    getMarkdown: (content: YooptaContentValue) => getMarkdown(editor, content),
    getPlainText: (content: YooptaContentValue) => getPlainText(editor, content),

    refElement: null,
  };

  return editor;
};

export const EDITOR_TO_ON_CHANGE = new WeakMap();
