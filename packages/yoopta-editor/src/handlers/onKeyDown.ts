import { isKeyHotkey } from 'is-hotkey';
import { Editor, Path, Range } from 'slate';
import { getDefaultYooptaChildrenValue } from '../components/Editor/defaultValue';
import { TextFormats } from '../editor';
import { YooEditor } from '../editor/types';
import { generateId } from '../utils/generateId';
import { HOTKEYS } from '../utils/hotkeys';

export function onKeyDown(editor: YooEditor, slate: Editor) {
  return (event) => {
    if (!slate.selection) return;
    if (HOTKEYS.isShiftEnter(event)) {
      if (event.isDefaultPrevented()) return;

      event.preventDefault();
      slate.insertText('\n');
    }

    if (HOTKEYS.isEnter(event)) {
      if (event.isDefaultPrevented()) return;
      event.preventDefault();

      // // [TODO] - if is expanded, delete the selection and add insert a new block
      // if (Range.isExpanded(slate.selection)) {
      //   Transforms.delete(slate, { at: slate.selection, unit: 'character' });
      //   return;
      // }

      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);
      const isEnd = Editor.isEnd(slate, slate.selection.anchor, slate.selection.anchor.path);

      if (!isStart && !isEnd) {
        editor.splitBlock({ slate });
        return;
      }

      const defaultBlock = getDefaultYooptaChildrenValue(generateId());
      const nextPath = editor.selection ? [editor.selection[0] + 1] : [0];
      editor.insertBlock(defaultBlock, { at: nextPath, slate, focus: true });
      return;
    }

    if (Range.isExpanded(slate.selection)) {
      for (const mark of Object.values(editor.formats)) {
        if (mark.hotkey && isKeyHotkey(mark.hotkey)(event)) {
          event.preventDefault();
          TextFormats.toggle(editor, mark);
          break;
        }
      }
    }

    if (HOTKEYS.isBackspace(event)) {
      const parentPath = Path.parent(slate.selection.anchor.path);

      // [TODO] - parent path should have only one element in selection. Ex. tables
      if (parentPath.length > 1) {
        return;
      }

      const text = Editor.string(slate, parentPath);
      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);

      if (text.length === 0 && isStart) {
        event.preventDefault();
        const prevBlockPath = editor.selection ? [editor.selection[0] - 1] : [0];

        // [TODO] - Create helper function to get the previous, next, current block
        const prevBlock = Object.values(editor.children).find((block) => block.meta.order === prevBlockPath[0]);

        editor.deleteBlock({ at: editor.selection });
        // [TODO] - Argument should be path, not a block id
        if (prevBlock) editor.focusBlock(prevBlock.id);
        return;
      }
      return;
    }
  };
}
