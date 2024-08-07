import { createDraft, finishDraft } from 'immer';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export function decreaseBlockDepth(editor: YooEditor, options: YooptaEditorTransformOptions = {}) {
  const { at = editor.selection, blockId = '' } = options;

  if (!blockId && !at) return;
  editor.children = createDraft(editor.children);

  const block = editor.children[blockId] || findPluginBlockBySelectionPath(editor);
  if (!block) return;

  block.meta.depth = block.meta.depth === 0 ? 0 : block.meta.depth - 1;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
  editor.emit('change', editor.children);
}
