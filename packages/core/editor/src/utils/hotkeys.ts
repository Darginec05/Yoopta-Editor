import { isKeyHotkey } from 'is-hotkey';

const HOTKEYS_MAP = {
  bold: 'mod+b',
  italic: 'mod+i',
  compose: ['down', 'left', 'right', 'up', 'backspace', 'enter'],
  arrowLeft: 'left',
  arrowUp: 'up',
  arrowDown: 'down',
  arrowRight: 'right',
  ctrlLeft: 'ctrl+left',
  escape: 'esc',
  ctrlRight: 'ctrl+right',
  deleteBackward: 'shift?+backspace',
  backspace: 'backspace',
  deleteForward: 'shift?+delete',
  extendBackward: 'shift+left',
  shiftDelete: 'shift+delete',
  extendForward: 'shift+right',
  shiftEnter: 'shift+enter',
  enter: 'enter',
  space: 'space',
  undo: 'mod+z',
  select: 'mod+a',
  shiftTab: 'shift+tab',
  shiftArrowUp: 'shift+up',
  shiftArrowDown: 'shift+down',
  tab: 'tab',
  cmd: 'mod',
  cmdEnter: 'mod+enter',
  cmdShiftEnter: 'mod+shift+enter',
  slashCommand: '/',
  copy: 'mod+c',
  cut: 'mod+x',
  cmdShiftRight: 'mod+shift+right',
  cmdShiftLeft: 'mod+shift+left',
  cmdShiftDelete: 'mod+shift+backspace',
  cmdShiftD: 'mod+shift+d',
  cmdAltDelete: 'mod+alt+backspace',
};

const APPLE_HOTKEYS = {
  moveLineBackward: 'opt+up',
  moveLineForward: 'opt+down',
  ctrlLeft: 'opt+left',
  ctrlRight: 'opt+right',
  deleteBackward: ['ctrl+backspace', 'ctrl+h'],
  deleteForward: ['ctrl+delete', 'ctrl+d'],
  deleteLineBackward: 'cmd+shift?+backspace',
  deleteLineForward: ['cmd+shift?+delete', 'ctrl+k'],
  deleteWordBackward: 'opt+shift?+backspace',
  deleteWordForward: 'opt+shift?+delete',
  extendLineBackward: 'opt+shift+up',
  extendLineForward: 'opt+shift+down',
  redo: 'cmd+shift+z',
  transposeCharacter: 'ctrl+t',
};

const WINDOWS_HOTKEYS = {
  deleteWordBackward: 'ctrl+shift?+backspace',
  deleteWordForward: 'ctrl+shift?+delete',
  redo: ['ctrl+y', 'ctrl+shift+z'],
};

const create = (key: string) => {
  const generic = HOTKEYS_MAP[key];
  const apple = APPLE_HOTKEYS[key];
  const windows = WINDOWS_HOTKEYS[key];
  const isGeneric = generic && isKeyHotkey(generic);
  const isApple = apple && isKeyHotkey(apple);
  const isWindows = windows && isKeyHotkey(windows);

  return (event: React.KeyboardEvent | KeyboardEvent) => {
    if (isGeneric && isGeneric(event)) return true;
    if (isApple && isApple(event)) return true;
    if (isWindows && isWindows(event)) return true;
    return false;
  };
};

export const HOTKEYS = {
  isBold: create('bold'),
  isCompose: create('compose'),
  isArrowLeft: create('arrowLeft'),
  isArrowRight: create('arrowRight'),
  isArrowUp: create('arrowUp'),
  isArrowDown: create('arrowDown'),
  isDeleteBackward: create('deleteBackward'),
  isDeleteForward: create('deleteForward'),
  isDeleteLineBackward: create('deleteLineBackward'),
  isDeleteLineForward: create('deleteLineForward'),
  isDeleteWordBackward: create('deleteWordBackward'),
  isDeleteWordForward: create('deleteWordForward'),
  isExtendBackward: create('extendBackward'),
  isExtendForward: create('extendForward'),
  isExtendLineBackward: create('extendLineBackward'),
  isExtendLineForward: create('extendLineForward'),
  isItalic: create('italic'),
  isMoveLineBackward: create('moveLineBackward'),
  isMoveLineForward: create('moveLineForward'),
  isCtrlLeft: create('ctrlLeft'),
  isCtrlRight: create('ctrlRight'),
  isRedo: create('redo'),
  isShiftEnter: create('shiftEnter'),
  isEnter: create('enter'),
  isTransposeCharacter: create('transposeCharacter'),
  isUndo: create('undo'),
  isSpace: create('space'),
  isSelect: create('select'),
  isTab: create('tab'),
  isShiftTab: create('shiftTab'),
  isBackspace: create('backspace'),
  isCmdEnter: create('cmdEnter'),
  isCmd: create('cmd'),
  isEscape: create('escape'),
  isSlashCommand: create('slashCommand'),
  isShiftArrowUp: create('shiftArrowUp'),
  isShiftArrowDown: create('shiftArrowDown'),
  isCopy: create('copy'),
  isCut: create('cut'),
  isShiftDelete: create('shiftDelete'),
  isCmdShiftEnter: create('cmdShiftEnter'),
  isCmdShiftRight: create('cmdShiftRight'),
  isCmdShiftLeft: create('cmdShiftLeft'),
  isCmdShiftDelete: create('cmdShiftDelete'),
  isCmdAltDelete: create('cmdAltDelete'),
  isCmdShiftD: create('cmdShiftD'),
};

export type HOTKEYS_TYPE = {
  [key in keyof typeof HOTKEYS]: (event: React.KeyboardEvent | KeyboardEvent) => boolean;
};
