import { createDraft, finishDraft } from 'immer';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { YooEditor, YooptaEditorOptions } from '../types';

export function increaseBlockDepth(editor: YooEditor, options: YooptaEditorOptions = {}) {
  const { at = editor.selection } = options;

  if (!at) return;
  editor.children = createDraft(editor.children);

  const block = findPluginBlockBySelectionPath(editor);
  if (!block) return;

  block.meta.depth = block.meta.depth + 1;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
}
