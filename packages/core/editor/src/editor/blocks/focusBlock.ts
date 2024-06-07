import { Editor, Path, Point, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { IS_FOCUSED_EDITOR } from '../../utils/weakMaps';
import { FocusAt, SlateEditor, YooEditor, YooptaEditorTransformOptions } from '../types';

export type FocusBlockOptions = Pick<YooptaEditorTransformOptions, 'focusAt' | 'slate'> & {
  waitExecution?: boolean;
  waitExecutionMs?: number;
  shouldUpdateBlockSelection?: boolean;
};

function getSelectionPath(slate: SlateEditor, focusAt?: FocusAt): FocusAt {
  if (Point.isPoint(focusAt)) {
    return focusAt;
  }

  if (Path.isPath(focusAt)) {
    return { path: focusAt, offset: 0 };
  }

  const [, firstNodePath] = Editor.first(slate, [0]);
  const firstLeafPath = firstNodePath ? firstNodePath : [0, 0];

  return { path: firstLeafPath, offset: 0 };
}

// [TODO] - update editor.selection after focus
export function focusBlock(editor: YooEditor, blockId: string, options: FocusBlockOptions = {}) {
  try {
    const { focusAt, waitExecution = true, waitExecutionMs = 0, shouldUpdateBlockSelection = true } = options;

    console.log('blockId', blockId);

    const focusBlockEditor = () => {
      const slate = options.slate || editor.blockEditorsMap[blockId];
      const block = editor.children[blockId];

      if (!slate || !block) return;

      const currentBlock = editor.blocks[block.type];
      if (!currentBlock.hasCustomEditor) {
        const selectionPath = getSelectionPath(slate, focusAt);
        Transforms.select(slate, selectionPath);
        ReactEditor.focus(slate);
      }

      if (shouldUpdateBlockSelection) {
        setTimeout(() => {
          editor.setSelection([block.meta.order]);
        }, 0);
      }
    };

    if (waitExecution) {
      setTimeout(() => focusBlockEditor(), waitExecutionMs);
    } else {
      focusBlockEditor();
    }

    IS_FOCUSED_EDITOR.set(editor, true);
  } catch (error) {}
}
