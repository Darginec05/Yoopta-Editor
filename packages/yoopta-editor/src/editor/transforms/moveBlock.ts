import { createDraft, finishDraft } from 'immer';
import { YooEditor, YooptaPath } from '../types';

export function moveBlock(editor: YooEditor, from: YooptaPath, to: YooptaPath) {
  editor.children = createDraft(editor.children);

  const [fromPosition] = from;
  const [toPosition] = to;

  const fromId = Object.keys(editor.children).find((id) => editor.children[id].meta.order === fromPosition);
  const toId = Object.keys(editor.children).find((id) => editor.children[id].meta.order === toPosition);

  const blockFrom = editor.children[fromId || ''];
  const blockTo = editor.children[toId || ''];

  if (blockFrom && blockTo) {
    blockFrom.meta.order = toPosition;
    blockTo.meta.order = fromPosition;
  }

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
}
