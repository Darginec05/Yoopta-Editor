import { Editor, Path } from 'slate';
import { YooEditor } from '../../editor/types';
import { HOTKEYS } from '../../utils/hotkeys';

const handleActionMenuKeyDown = (editor: YooEditor, slate: Editor, options) => (event: React.KeyboardEvent) => {
  const { open, close, state } = options;

  if (HOTKEYS.isSlashCommand(event)) {
    if (!slate.selection) return;

    const parentPath = Path.parent(slate.selection.anchor.path);
    const string = Editor.string(slate, parentPath);
    const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.focus);

    if (!isStart || string.trim().length > 0) return;

    const domSelection = window.getSelection();
    if (!domSelection) return;

    const domRange = domSelection.getRangeAt(0);
    const selectionRect = domRange.getBoundingClientRect();

    if (domRange) {
      state.refs.setReference({
        getBoundingClientRect: () => selectionRect,
        getClientRects: () => domRange.getClientRects(),
      });

      open();
    }
  }

  if (!state.open) return;

  if (HOTKEYS.isTab(event)) {
    event.preventDefault();
    return;
  }

  if (HOTKEYS.isArrowUp(event)) {
    event.preventDefault();
    return;
  }

  if (HOTKEYS.isArrowDown(event)) {
    event.preventDefault();
    return;
  }

  if (HOTKEYS.isArrowLeft(event)) {
    event.preventDefault();
    return;
  }

  if (HOTKEYS.isArrowRight(event)) {
    event.preventDefault();
    return;
  }

  if (HOTKEYS.isBackspace(event)) {
    if (!slate.selection) return;
    const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.focus);
    if (isStart) return close();
  }

  if (HOTKEYS.isEscape(event)) {
    event.preventDefault();
    close();
    return;
  }

  if (HOTKEYS.isEnter(event)) {
    event.preventDefault();
    return;
  }
};

const handleActionMenuKeyUp =
  (editor: YooEditor, slate: Editor, { open, close, change, state }) =>
  (event: React.KeyboardEvent) => {
    if (!slate.selection) return;

    const parentPath = Path.parent(slate.selection.anchor.path);
    const string = Editor.string(slate, parentPath);

    if (string.length === 0) return close();
    change({ text: string });
  };

export const events = {
  onKeyDown: handleActionMenuKeyDown,
  onKeyUp: handleActionMenuKeyUp,
};
