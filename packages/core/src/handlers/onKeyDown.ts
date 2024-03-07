import { isKeyHotkey } from 'is-hotkey';
import { Editor, Path, Point, Range, Text, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { getDefaultParagraphBlock } from '../components/Editor/defaultValue';
import { SlateEditor, YooEditor, YooptaBlockPath } from '../editor/types';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../utils/findSlateBySelectionPath';
import { generateId } from '../utils/generateId';
import { HOTKEYS } from '../utils/hotkeys';

/** */
function getLastNodePoint(slate: SlateEditor, path: Path): Point {
  const [, lastNodePath] = Editor.last(slate, path);
  const lastNodeTextLength = Editor.string(slate, lastNodePath).length;

  return {
    path: lastNodePath,
    offset: lastNodeTextLength,
  };
}

function getNextNodePoint(slate: SlateEditor, path: Path): Point {
  const [, firstNodePath] = Editor.first(slate, path);

  return {
    path: firstNodePath,
    offset: 0,
  };
}
/** */

export function onKeyDown(editor: YooEditor) {
  return (event: React.KeyboardEvent) => {
    const slate = findSlateBySelectionPath(editor, { at: editor.selection });
    if (!slate || !slate.selection) return;

    const parentPath = Path.parent(slate.selection.anchor.path);

    if (HOTKEYS.isShiftEnter(event)) {
      if (event.isDefaultPrevented()) return;

      event.preventDefault();
      slate.insertText('\n');

      return;
    }

    if (HOTKEYS.isEnter(event)) {
      if (event.isDefaultPrevented()) return;
      event.preventDefault();

      const isStart = Editor.isStart(slate, slate.selection.anchor, parentPath);
      const isEnd = Editor.isEnd(slate, slate.selection.anchor, parentPath);

      if (!isStart && !isEnd) {
        editor.splitBlock({ slate, focus: true });
        return;
      }

      const defaultBlock = getDefaultParagraphBlock(generateId());
      const nextPath: YooptaBlockPath = editor.selection ? [editor.selection[0] + 1] : [0];
      editor.insertBlock(defaultBlock, { at: nextPath, slate, focus: true });
      return;
    }

    if (HOTKEYS.isBackspace(event)) {
      if (event.isDefaultPrevented()) return;

      const parentPath = Path.parent(slate.selection.anchor.path);
      const isStart = Editor.isStart(slate, slate.selection.anchor, parentPath);

      // When the cursor is at the start of the block, delete the block
      if (isStart) {
        event.preventDefault();
        const text = Editor.string(slate, parentPath);
        const prevBlockPathIndex = editor.selection ? editor.selection[0] - 1 : 0;
        const prevSlate = findSlateBySelectionPath(editor, { at: [prevBlockPathIndex] });
        let focusAt;

        if (prevSlate) {
          focusAt = getLastNodePoint(prevSlate, parentPath);
        }

        // If current block is empty just delete block
        if (text.trim().length === 0) {
          return editor.deleteBlock({ at: editor.selection, focus: true, focusAt });
        }
        // If current block is not empty merge text nodes with previous block
        else {
          if (Range.isExpanded(slate.selection)) {
            return Transforms.delete(slate, { at: slate.selection });
          }

          // If we try to delete first block do nothing
          if (!prevSlate) return;

          const prevSlateText = Editor.string(prevSlate, [0, 0]);
          // If previous block values is empty just delete block without merging
          if (prevSlateText.length === 0) {
            return editor.deleteBlock({
              at: [prevBlockPathIndex],
              focus: true,
              focusAt,
            });
          }

          const childNodeEntries = Array.from(
            Editor.nodes(slate, {
              at: [0],
              match: (n) => !Editor.isEditor(n) && (Text.isText(n) || Editor.isInline(slate, n)),
              mode: 'highest',
            }),
          );

          const childNodes = childNodeEntries.map(([node]) => node);
          Transforms.insertNodes(prevSlate, childNodes, { at: Editor.end(prevSlate, []) });
          return editor.deleteBlock({
            at: editor.selection,
            focus: true,
            focusAt,
          });
        }
      }
      return;
    }

    if (HOTKEYS.isSelect(event)) {
      if (event.isDefaultPrevented()) return;

      const [, firstElementPath] = Editor.first(slate, [0]);
      const [, lastElementPath] = Editor.last(slate, [slate.children.length - 1]);

      const fullRange = Editor.range(slate, firstElementPath, lastElementPath);
      const isAllBlockElementsSelected = Range.equals(slate.selection, fullRange);

      // [TODO] - handle cases for void node elements and when string is empty
      if (Range.isExpanded(slate.selection) && isAllBlockElementsSelected) {
        event.preventDefault();

        ReactEditor.blur(slate);
        ReactEditor.deselect(slate);
        Transforms.deselect(slate);

        editor.setBlockSelected([], { allSelected: true });
        return;
      }
    }

    if (HOTKEYS.isShiftTab(event)) {
      if (event.isDefaultPrevented()) return;
      event.preventDefault();

      editor.decreaseBlockDepth();
      return;
    }

    if (HOTKEYS.isTab(event)) {
      if (event.isDefaultPrevented()) return;
      event.preventDefault();

      editor.increaseBlockDepth();
      return;
    }

    if (HOTKEYS.isArrowUp(event)) {
      if (event.isDefaultPrevented()) return;
      const parentPath = Path.parent(slate.selection.anchor.path);
      const isStart = Editor.isStart(slate, slate.selection.anchor, parentPath);

      console.log('isStart', isStart);
      console.log('parentPath', parentPath);
      console.log('slate.children', slate.children);

      if (isStart) {
        const prevPath: YooptaBlockPath | null = editor.selection ? [editor.selection[0] - 1] : null;
        const prevSlate = findSlateBySelectionPath(editor, { at: prevPath });
        const prevBlock = findPluginBlockBySelectionPath(editor, { at: prevPath });

        if (prevSlate && prevBlock) {
          const [, prevLastPath] = Editor.last(prevSlate, [0]);
          const prevLastNodeTextLength = Editor.string(prevSlate, prevLastPath).length;

          const selection: Point = {
            path: prevLastPath,
            offset: prevLastNodeTextLength,
          };

          event.preventDefault();
          editor.focusBlock(prevBlock.id, { focusAt: selection, waitExecution: false });
          return;
        }
      }
    }

    if (HOTKEYS.isArrowDown(event)) {
      const parentPath = Path.parent(slate.selection.anchor.path);
      const isEnd = Editor.isEnd(slate, slate.selection.anchor, parentPath);

      if (isEnd) {
        const nextPath: YooptaBlockPath | null = editor.selection ? [editor.selection[0] + 1] : null;
        const nextSlate = findSlateBySelectionPath(editor, { at: nextPath });
        const nextBlock = findPluginBlockBySelectionPath(editor, { at: nextPath });

        if (nextSlate && nextBlock) {
          const selection: Point = getNextNodePoint(nextSlate, parentPath);

          event.preventDefault();
          editor.focusBlock(nextBlock.id, { focusAt: selection, waitExecution: false });
          return;
        }
      }
    }

    if (Range.isExpanded(slate.selection)) {
      for (const mark of Object.values(editor.formats)) {
        if (mark.hotkey && isKeyHotkey(mark.hotkey)(event)) {
          event.preventDefault();
          editor.formats[mark.type].toggle();
          break;
        }
      }
    }
  };
}
