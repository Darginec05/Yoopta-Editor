import { createDraft, finishDraft } from 'immer';
import { YooptaEditorTransformOptions, YooEditor } from '../types';

export function updateBlock(editor: YooEditor, id: string, data: any, options: YooptaEditorTransformOptions) {
  editor.children = createDraft(editor.children);

  const block = editor.children[id];
  block.value = data;

  editor.children = finishDraft(editor.children);

  // [TODO] - optimize applyChanges while updating slate value
  // editor.applyChanges();
}
