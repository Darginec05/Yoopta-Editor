import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { SlateEditor, YooEditor, YooptaEditorTransformOptions } from '../types';

export type EditorBlurOptions = Pick<YooptaEditorTransformOptions, 'slate'> & {
  waitExecution?: boolean;
  waitExecutionMs?: number;
};

function blurFn(editor: YooEditor, slate: SlateEditor) {
  ReactEditor.blur(slate);
  ReactEditor.deselect(slate);
  Transforms.deselect(slate);

  editor.setBlockSelected(null);
  editor.setSelection(null);
}

export function blur(editor: YooEditor, options: EditorBlurOptions = {}) {
  const slate = options.slate ?? findSlateBySelectionPath(editor);

  if (!slate) return;

  const { waitExecution, waitExecutionMs } = options;

  if (waitExecution) {
    setTimeout(() => blurFn(editor, slate), waitExecutionMs);
    return;
  }

  blurFn(editor, slate);

  editor.applyChanges();
}
