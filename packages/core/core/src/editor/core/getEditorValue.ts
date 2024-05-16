import { YooEditor } from '../types';

export function getEditorValue(editor: YooEditor) {
  editor.applyChanges();
  return editor.children;
}
