import { insertBlock } from './transforms/insertBlock';
import { deleteBlock } from './transforms/deleteBlock';
import { moveBlock } from './transforms/moveBlock';
import { focusBlock } from './transforms/focusBlock';
import { setSelection } from './selection/setSelection';

export const createYooptaEditor = () => {
  const editor = {
    children: {},
    selection: null,
    onChange: () => {},
    insertBlock: (...args) => insertBlock(editor, ...args),
    deleteBlock: (...args) => deleteBlock(editor, ...args),
    moveBlock: (...args) => moveBlock(editor, ...args),
    focusBlock: (...args) => focusBlock(editor, ...args),
    setSelection: (...args) => setSelection(editor, ...args),
    blockEditorsMap: {},
  };

  return editor;
};

export const EDITOR_TO_ON_CHANGE = new WeakMap();
