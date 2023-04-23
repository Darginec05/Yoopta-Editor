import { isKeyHotkey } from 'is-hotkey';
import { KeyboardEvent } from 'react';

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
  extendForward: 'shift+right',
  shiftEnter: 'shift+enter',
  enter: 'enter',
  space: 'space',
  undo: 'mod+z',
  select: 'mod+a',
  shiftTab: 'shift+tab',
  tab: 'tab',
  cmdEnter: 'mod+enter',
  kekCeburek: 'mod+enter',
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

  return (event: KeyboardEvent) => {
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
  isEscape: create('escape'),
  isKekceburek: create('kekCeburek'),
};

export type HOTKEYS_TYPE = {
  [key in keyof typeof HOTKEYS]: (event: KeyboardEvent) => boolean;
};
