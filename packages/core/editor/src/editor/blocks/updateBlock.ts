import { createDraft, finishDraft } from 'immer';
import { YooEditor, YooptaBlockData } from '../types';

export function updateBlock<TElementKeys extends string, TProps>(
  editor: YooEditor,
  blockId: string,
  data: Partial<YooptaBlockData>,
) {
  editor.children = createDraft(editor.children);
  let shouldApply = false;

  const block = editor.children[blockId];

  if (!block) {
    return;
  }

  if (data.id) {
    block.id = data.id;
    shouldApply = true;
  }

  if (data.type) {
    block.type = data.type;
    shouldApply = true;
  }

  if (data.meta) {
    block.meta = data.meta;
    shouldApply = true;
  }

  if (data.value) {
    block.value = data.value;
  }

  editor.children = finishDraft(editor.children);

  // [TODO] - optimize applyChanges while updating slate value
  if (shouldApply) {
    editor.applyChanges();
  }

  editor.emit('change', editor.children);
}
