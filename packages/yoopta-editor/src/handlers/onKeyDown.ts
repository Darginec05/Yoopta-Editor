import { createDraft, finishDraft } from 'immer';
import { isKeyHotkey } from 'is-hotkey';
import { Editor, Path, Range, Text, Transforms } from 'slate';
import { getDefaultYooptaChildrenValue } from '../components/Editor/defaultValue';
import { TextFormats } from '../editor';
import { YooEditor } from '../editor/types';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';
import { generateId } from '../utils/generateId';
import { getMaxOffsetInElement } from '../utils/getMaxOffsetInElement';
import { HOTKEYS } from '../utils/hotkeys';

export function onKeyDown(editor: YooEditor, slate: Editor) {
  return (event) => {
    if (!slate.selection) return;
    if (HOTKEYS.isShiftEnter(event)) {
      if (event.isDefaultPrevented()) return;

      event.preventDefault();
      slate.insertText('\n');

      return;
    }

    if (HOTKEYS.isEnter(event)) {
      if (event.isDefaultPrevented()) return;
      event.preventDefault();

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

    if (HOTKEYS.isBackspace(event)) {
      const parentPath = Path.parent(slate.selection.anchor.path);
      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);

      // When the cursor is at the start of the block, delete the block
      if (isStart) {
        event.preventDefault();
        const text = Editor.string(slate, parentPath);

        // If current block is empty just delete block
        if (text.length === 0) {
          return editor.deleteBlock({ at: editor.selection, focus: true });
        }
        // If current block is not empty merge text nodes with previous block
        else {
          const prevBlockPathIndex = editor.selection ? editor.selection[0] - 1 : 0;

          const prevBlock = findPluginBlockBySelectionPath(editor, { at: [prevBlockPathIndex] });
          const prevSlate = editor.blockEditorsMap[prevBlock!.id];
          const prevSlateText = Editor.string(prevSlate, [0]);

          // If previous block values is empty just delete block
          if (prevSlateText.length === 0) {
            return editor.deleteBlock({ at: [prevBlockPathIndex], focus: true });
          }

          console.log('maxOffsetInElement', getMaxOffsetInElement(prevSlate, [0]));

          const childNodeEntries = Array.from(
            Editor.nodes(slate, {
              at: [0],
              match: (n) => Text.isText(n) || Editor.isInline(slate, n),
              mode: 'highest',
            }),
          );

          const childNodes = childNodeEntries.map(([node]) => node);
          Transforms.insertNodes(prevSlate, childNodes, { at: Editor.end(prevSlate, []) });

          return editor.deleteBlock({ at: editor.selection, focus: true });
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

    if (Range.isExpanded(slate.selection)) {
      for (const mark of Object.values(editor.formats)) {
        if (mark.hotkey && isKeyHotkey(mark.hotkey)(event)) {
          event.preventDefault();
          TextFormats.toggle(editor, mark);
          break;
        }
      }
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
