import { insertBlock } from './transforms/insertBlock';
import { deleteBlock } from './transforms/deleteBlock';
import { moveBlock } from './transforms/moveBlock';
import { focusBlock } from './transforms/focusBlock';
import { updateBlock } from './transforms/updateBlock';
import { splitBlock } from './transforms/splitBlock';
import { setSelection } from './selection/setSelection';
import { TextFormat, YooEditor } from './types';
import { toggle } from './textFormats/toggle';
import { update } from './textFormats/update';
import { isActive } from './textFormats/isActive';
import { increaseBlockDepth } from './transforms/increaseBlockDepth';
import { decreaseBlockDepth } from './transforms/decreaseBlockDepth';

// export const Transforms = {}
// export const Selection = {}

export const TextFormats: TextFormat = {
  type: '',
  hotkey: '',
  value: '',
  isActive: (editor, ...args) => isActive(editor, ...args),
  toggle: (editor, ...args) => toggle(editor, ...args),
  update: (editor, ...args) => update(editor, ...args),
};

export const createYooptaEditor = (): YooEditor => {
  const editor: YooEditor = {
    children: {},
    selection: null,
    applyChanges: () => {},
    insertBlock: (...args) => insertBlock(editor, ...args),
    deleteBlock: (...args) => deleteBlock(editor, ...args),
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
    blockEditorsMap: {},
    blocks: {},
    formats: {},
  };

  return editor;
};

export const EDITOR_TO_ON_CHANGE = new WeakMap();
