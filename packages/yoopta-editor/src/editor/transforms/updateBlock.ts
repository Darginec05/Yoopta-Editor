import { createDraft, finishDraft } from 'immer';
import { YooptaEditorOptions, YooEditor } from '../types';

export function updateBlock(editor: YooEditor, id: string, data, options: YooptaEditorOptions) {
  editor.children = createDraft(editor.children);

  const block = editor.children[id];
  block.value = data;

  editor.children = finishDraft(editor.children);

  // [TODO] - optimize applyChanges while updating slate value
  // editor.applyChanges();
}
