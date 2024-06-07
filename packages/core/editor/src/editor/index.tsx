import { insertBlock } from './blocks/insertBlock';
import { deleteBlock } from './blocks/deleteBlock';
import { moveBlock } from './blocks/moveBlock';
import { focusBlock } from './blocks/focusBlock';
import { splitBlock } from './blocks/splitBlock';
import { setSelection } from './selection/setSelection';
import { YooEditor } from './types';
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

// export const YooEditor = {}
// export const BlockTransforms = {}
// export const Selection = {}
// export const TextFormats = {}

// YooEditor.get(editor, 'children');
// YooEditor.applyChanges(editor);

// Block.get(editor, 'paragraph');
// BlockTransforms.update(editor, 'paragraph', { elements: {} });
// BlockTransforms.create();
// BlockTransforms.delete();

// TextFormats.get(editor, 'bold');
// TextFormats.TextFormats.update(editor, 'bold', true);

export const createYooptaEditor = (): YooEditor => {
  const editor: YooEditor = {
    id: '',
    children: {},
    selection: null,
    selectedBlocks: null,
    readOnly: false,
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
    getBlock: (...args) => undefined,
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
  };

  return editor;
};

export const EDITOR_TO_ON_CHANGE = new WeakMap();
