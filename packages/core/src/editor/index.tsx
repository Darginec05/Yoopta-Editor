import { insertBlock } from './transforms/insertBlock';
import { deleteBlock } from './transforms/deleteBlock';
import { moveBlock } from './transforms/moveBlock';
import { focusBlock } from './transforms/focusBlock';
import { splitBlock } from './transforms/splitBlock';
import { setSelection } from './selection/setSelection';
import { YooEditor } from './types';
import { increaseBlockDepth } from './transforms/increaseBlockDepth';
import { decreaseBlockDepth } from './transforms/decreaseBlockDepth';
import { getEditorValue } from './core/getEditorValue';
import { setBlockSelected } from './selection/setBlockSelected';
import { duplicateBlock } from './transforms/duplicateBlock';

// export const YooEditor = {}
// export const BlockTransforms = {}
// export const Selection = {}
// export const TextFormats = {}

export const createYooptaEditor = (): YooEditor => {
  const editor: YooEditor = {
    children: {},
    selection: null,
    selectedBlocks: null,
    getEditorValue: () => getEditorValue(editor),
    applyChanges: () => {},
    insertBlock: (...args) => insertBlock(editor, ...args),
    deleteBlock: (...args) => deleteBlock(editor, ...args),
    duplicateBlock: (...args) => duplicateBlock(editor, ...args),
    increaseBlockDepth: (...args) => increaseBlockDepth(editor, ...args),
    decreaseBlockDepth: (...args) => decreaseBlockDepth(editor, ...args),
    moveBlock: (...args) => moveBlock(editor, ...args),
    focusBlock: (...args) => focusBlock(editor, ...args),
    // getBlock: (...args) => getBlock(editor, ...args),
    // updateBlock: (...args) => updateBlock(editor, ...args),
    getBlock: (...args) => undefined,
    updateBlock: (...args) => undefined,
    splitBlock: (...args) => splitBlock(editor, ...args),
    setSelection: (...args) => setSelection(editor, ...args),
    setBlockSelected: (...args) => setBlockSelected(editor, ...args),
    blockEditorsMap: {},
    blocks: {},
    formats: {},
    shortcuts: {},
  };

  return editor;
};

export const EDITOR_TO_ON_CHANGE = new WeakMap();
