import { createDraft, finishDraft } from 'immer';
import { isKeyHotkey } from 'is-hotkey';
import { Editor, Path, Range } from 'slate';
import { getDefaultYooptaChildrenValue } from '../components/Editor/defaultValue';
import { TextFormats } from '../editor';
import { YooEditor } from '../editor/types';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';
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

      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);

      if (isStart) {
        const text = Editor.string(slate, parentPath);

        if (text.length === 0) {
          event.preventDefault();
          const prevBlockPath = editor.selection ? [editor.selection[0] - 1] : [0];

          // [TODO] - Create helper function to get the previous, next, current block
          const prevBlock = Object.values(editor.children).find((block) => block.meta.order === prevBlockPath[0]);

          editor.deleteBlock({ at: editor.selection });
          // [TODO] - Argument should be path, not a block id
          if (prevBlock) editor.focusBlock(prevBlock.id);
          return;
        } else {
          // [TODO] - if current block has text merge nodes with prev block
        }
      }
      return;
    }

    if (HOTKEYS.isShiftTab(event)) {
      event.preventDefault();
      editor.children = createDraft(editor.children);

      const block = findPluginBlockBySelectionPath(editor);
      if (!block) return;
      // [TODO] = add max depth
      block.meta.depth = block.meta.depth === 0 ? 0 : block.meta.depth - 1;

      editor.children = finishDraft(editor.children);
      editor.applyChanges();

      return;
    }

    if (HOTKEYS.isTab(event)) {
      event.preventDefault();
      editor.children = createDraft(editor.children);

      const block = findPluginBlockBySelectionPath(editor);
      if (!block) return;
      block.meta.depth = block.meta.depth + 1;

      editor.children = finishDraft(editor.children);
      editor.applyChanges();

      return;
    }

    // [TODO] - handle sharing cursor between blocks
    if (HOTKEYS.isArrowUp(event)) {
      console.log('Editor.start', Editor.start(slate, slate.selection.anchor.path));
    }

    // [TODO] - handle sharing cursor between blocks
    if (HOTKEYS.isArrowDown(event)) {
      console.log('Editor.end', Editor.end(slate, slate.selection.anchor.path));
    }
  };
}
