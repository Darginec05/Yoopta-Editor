import { Editor, Path } from 'slate';
import { getDefaultYooptaChildrenValue } from '../components/Editor/defaultValue';
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

      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);
      const isEnd = Editor.isEnd(slate, slate.selection.anchor, slate.selection.anchor.path);

      // Split the node at the cursor
      if (!isStart && !isEnd) {
      }
      const defaultBlock = getDefaultYooptaChildrenValue(generateId());
      const nextPath = editor.selection ? [editor.selection[0] + 1] : [0];
      editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
      return;
    }

    if (HOTKEYS.isBackspace(event)) {
      const parentPath = Path.parent(slate.selection.anchor.path);
      const text = Editor.string(slate, parentPath);
      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);

      if (text.length === 0 && isStart) {
        event.preventDefault();
        const prevPath = editor.selection ? [editor.selection[0] - 1] : [0];
        console.log('prevPath', prevPath);
        console.log('editor.selection', editor.selection);

        // [TODO] - Create helper function to get the previous, next, current block
        const prevBlock = Object.values(editor.children).find((block) => block.meta.order === prevPath[0]);

        editor.deleteBlock({ at: editor.selection });
        // [TODO] - Argument should be path, not a block id
        if (prevBlock) editor.focusBlock(prevBlock.id);
        return;
      }
      return;
    }
  };
}
