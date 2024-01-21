import { createDraft, finishDraft } from 'immer';
import { YooEditor } from '../../components/Editor/contexts/UltraYooptaContext/UltraYooptaContext';

export function updateBlock(editor: YooEditor, id: string, data, options) {
  editor.children = createDraft(editor.children);

  const block = editor.children[id];
  block.value = data;

  editor.children = finishDraft(editor.children);

  // [TODO] - optimize applyChanges while updating slate value
  // editor.applyChanges();
}
