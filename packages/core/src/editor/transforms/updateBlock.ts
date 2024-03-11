import { createDraft, finishDraft } from 'immer';
import { YooEditor, YooptaBlockData } from '../types';

export function updateBlock<TElementKeys extends string, TProps>(
  editor: YooEditor,
  id: string,
  data: Partial<Pick<YooptaBlockData, 'meta' | 'value'>>,
) {
  editor.children = createDraft(editor.children);

  const block = editor.children[id];

  if (!block) {
    throw Error(`Block with id ${id} not found`);
  }

  if (data.meta) block.meta = data.meta;
  if (data.value) block.value = data.value;

  editor.children = finishDraft(editor.children);
  editor.emit('block:update', { id, data });

  // [TODO] - optimize applyChanges while updating slate value
  // editor.applyChanges();
}
