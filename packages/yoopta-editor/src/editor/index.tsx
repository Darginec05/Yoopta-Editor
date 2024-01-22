import { insertBlock } from './transforms/insertBlock';
import { deleteBlock } from './transforms/deleteBlock';
import { moveBlock } from './transforms/moveBlock';
import { focusBlock } from './transforms/focusBlock';
import { updateBlock } from './transforms/updateBlock';
import { setSelection } from './selection/setSelection';
import { YooEditor } from './types';

export const createYooptaEditor = (): YooEditor => {
  const editor = {
    children: {},
    selection: null,
    applyChanges: () => {},
    insertBlock: (...args) => insertBlock(editor, ...args),
    deleteBlock: (...args) => deleteBlock(editor, ...args),
    moveBlock: (...args) => moveBlock(editor, ...args),
    // getBlock: (...args) => getBlock(editor, ...args),
    getBlock: (...args) => undefined,
    focusBlock: (...args) => focusBlock(editor, ...args),
    updateBlock: (...args) => updateBlock(editor, ...args),
    setSelection: (...args) => setSelection(editor, ...args),
    blockEditorsMap: {},
  };

  return editor;
};

export const EDITOR_TO_ON_CHANGE = new WeakMap();
