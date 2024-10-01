import { isKeyHotkey } from 'is-hotkey';
import { Editor, Path, Point, Range, Text, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { Blocks } from '../editor/blocks';
import { Paths } from '../editor/paths';
import { SlateEditor, YooEditor, YooptaBlockPath } from '../editor/types';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../utils/findSlateBySelectionPath';
import { generateId } from '../utils/generateId';
import { HOTKEYS } from '../utils/hotkeys';

/** */
function getLastNodePoint(slate: SlateEditor, path: Path): Point {
  try {
    const [, lastNodePath] = Editor.last(slate, path);
    const lastNodeTextLength = Editor.string(slate, lastNodePath).length;

    return {
      path: lastNodePath,
      offset: lastNodeTextLength,
    };
  } catch (error) {
    return {
      path: [0, 0],
      offset: 0,
    };
  }
}

function getNextNodePoint(slate: SlateEditor, path: Path): Point {
  try {
    const [, firstNodePath] = Editor.first(slate, path);

    return {
      path: firstNodePath,
      offset: 0,
    };
  } catch (error) {
    return {
      path: [0, 0],
      offset: 0,
    };
  }
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

      const currentBlock = Blocks.getBlock(editor, { at: editor.selection });
      const defaultBlock = Blocks.buildBlockData({ id: generateId() });

      const string = Editor.string(slate, slate.selection.anchor.path);
      const insertBefore = isStart && string.length > 0;
      const nextPath = Paths.getNextPath(editor.selection);

      // [TEST]
      editor.insertBlock(defaultBlock.type, {
        at: insertBefore ? editor.selection : nextPath,
        focus: !insertBefore,
      });

      // [TEST]
      if (insertBefore && currentBlock) {
        editor.focusBlock(currentBlock.id);
      }

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
        const prevBlockPath = Paths.getPreviousPath(editor.selection);
        const prevSlate = findSlateBySelectionPath(editor, { at: prevBlockPath });
        const prevBlock = findPluginBlockBySelectionPath(editor, { at: prevBlockPath });
        const prevBlockEntity = editor.blocks[prevBlock?.type || ''];
        let focusAt;

        if (prevSlate && !prevBlockEntity.hasCustomEditor) {
          // [TODO] - should be parent path, but for prev slate
          focusAt = getLastNodePoint(prevSlate, parentPath);
        }

        // If current block is empty just delete block
        if (text.trim().length === 0) {
          // [TEST]
          return editor.deleteBlock({ at: editor.selection, focus: true, focusAt });
        }
        // If current block is not empty merge text nodes with previous block
        else {
          if (Range.isExpanded(slate.selection)) {
            return Transforms.delete(slate, { at: slate.selection });
          }

          const prevBlockPath = Paths.getPreviousPath(editor.selection);
          const prevBlock = findPluginBlockBySelectionPath(editor, { at: prevBlockPath });
          const prevBlockEntity = editor.blocks[prevBlock?.type || ''];

          // [TODO] - if prev block has custom editor (not slate) we need jump to prevprev block
          if (prevBlockEntity && prevBlockEntity.hasCustomEditor) return;

          // If we try to delete first block do nothing
          if (!prevSlate) return;

          const prevSlateText = Editor.string(prevSlate, [0, 0]);
          // If previous block values is empty just delete block without merging
          if (prevSlateText.length === 0) {
            return editor.deleteBlock({
              at: prevBlockPath,
              focus: true,
              // focusAt,
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
            // focusAt,
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

      const string = Editor.string(slate, fullRange);
      const isElementEmpty = string.trim().length === 0;

      // [TODO] - handle cases for void node elements
      if ((Range.isExpanded(slate.selection) && isAllBlockElementsSelected) || isElementEmpty) {
        event.preventDefault();

        ReactEditor.blur(slate);
        ReactEditor.deselect(slate);
        Transforms.deselect(slate);

        const allBlockPaths = Array.from({ length: Object.keys(editor.children).length }, (_, i) => i);
        editor.setSelection([null, allBlockPaths]);
        // editor.setBlockSelected([], { allSelected: true });
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

    // [TODO] - default behavior for complex plugins
    if (HOTKEYS.isArrowUp(event)) {
      if (event.isDefaultPrevented()) return;
      // If element with any paths has all paths at 0
      const isAllPathsInStart = new Set(slate.selection.anchor.path).size === 1;
      if (isAllPathsInStart) {
        const prevPath: YooptaBlockPath | null = Paths.getPreviousPath(editor.selection);
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
          editor.focusBlock(prevBlock.id, {
            focusAt: selection,
            waitExecution: false,
            shouldUpdateBlockSelection: true,
          });
          return;
        }
      }
    }

    // [TODO] - default behavior for complex plugins
    if (HOTKEYS.isArrowDown(event)) {
      if (event.isDefaultPrevented()) return;
      const parentPath = Path.parent(slate.selection.anchor.path);
      const isEnd = Editor.isEnd(slate, slate.selection.anchor, parentPath);
      if (isEnd) {
        const nextPath: YooptaBlockPath | null = Paths.getNextPath(editor.selection);
        const nextSlate = findSlateBySelectionPath(editor, { at: nextPath });
        const nextBlock = findPluginBlockBySelectionPath(editor, { at: nextPath });
        if (nextSlate && nextBlock) {
          // [TODO] - should parent path, but for next slate
          const selection: Point = getNextNodePoint(nextSlate, parentPath);
          event.preventDefault();
          editor.focusBlock(nextBlock.id, { focusAt: selection, waitExecution: false });
          return;
        }
      }
    }

    if (Range.isExpanded(slate.selection)) {
      const marks = Object.values(editor.formats);
      if (marks.length > 0) {
        for (const mark of Object.values(editor.formats)) {
          if (mark.hotkey && isKeyHotkey(mark.hotkey)(event)) {
            event.preventDefault();
            editor.formats[mark.type].toggle();
            break;
          }
        }
      }
    }
  };
}
