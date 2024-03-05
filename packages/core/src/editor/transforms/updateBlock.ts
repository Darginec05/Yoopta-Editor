import { createDraft, finishDraft } from 'immer';
import { YooptaEditorTransformOptions, YooEditor, YooptaBlockData } from '../types';

export function updateBlock(
  editor: YooEditor,
  id: string,
  data: Partial<YooptaBlockData>,
  options: YooptaEditorTransformOptions,
) {
  editor.children = createDraft(editor.children);

  const block = editor.children[id];

  if (!block) {
    throw Error(`Block with id ${id} not found`);
  }

  if (data.id) block.id = data.id;
  if (data.type) block.type = data.type;
  if (data.meta) block.meta = data.meta;
  if (data.value) block.value = data.value;

  editor.children = finishDraft(editor.children);

  // [TODO] - optimize applyChanges while updating slate value
  // editor.applyChanges();
}
