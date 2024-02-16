import { YooEditor, YooptaPath } from '../types';

export function setSelection(editor: YooEditor, path: YooptaPath | null) {
  editor.selection = path;
  editor.applyChanges();
}
