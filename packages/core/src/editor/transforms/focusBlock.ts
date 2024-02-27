import { Editor, Path, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { FocusAt, YooEditor, YooptaEditorTransformOptions } from '../types';

function getOffsetFocus(slate: Editor, path: Path, focusAt: FocusAt) {
  const text = Editor.string(slate, path);

  if (typeof focusAt === 'number') {
    return focusAt;
  }

  if (focusAt === 'end') {
    return text.length;
  }

  return 0;
}

export type FocusBlockOptions = Pick<YooptaEditorTransformOptions, 'focusAt' | 'slate'> & {
  waitExecution?: boolean;
  waitExecutionMs?: number;
};

// [TODO] - update editor.selection after focus
export function focusBlock(editor: YooEditor, blockId: string, options: FocusBlockOptions = {}) {
  const { focusAt = 'start', waitExecution = true, waitExecutionMs = 0 } = options;

  const focusBlockEditor = () => {
    const slate = options.slate || editor.blockEditorsMap[blockId];
    const block = editor.children[blockId];

    const [firstEntry] = Editor.nodes(slate, {
      at: [0, 0],
      mode: 'lowest',
    });

    // [TODO] - handle case when firstEntry is not defined
    const firstLeafPath = firstEntry[1] || [0, 0];
    const offset = getOffsetFocus(slate, firstEntry[1], focusAt);

    console.log('offset', offset);

    // [TODO] - handle offset position. Add 'focusAt' property to options
    Transforms.select(slate, { path: firstLeafPath, offset });
    ReactEditor.focus(slate);
    editor.setSelection([block.meta.order]);
  };

  if (waitExecution) {
    setTimeout(() => focusBlockEditor(), waitExecutionMs);
  } else {
    focusBlockEditor();
  }
}
