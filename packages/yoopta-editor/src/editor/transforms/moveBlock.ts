import { createDraft, finishDraft } from 'immer';
import { YooEditor } from '../../components/Editor/contexts/UltraYooptaContext/UltraYooptaContext';

export function moveBlock(editor: YooEditor, from: number[], to: number[]) {
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
