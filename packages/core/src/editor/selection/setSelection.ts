import { YooEditor, YooptaBlockPath } from '../types';

export function setSelection(editor: YooEditor, path: YooptaBlockPath | null) {
  editor.selection = path;
  // editor.applyChanges();
}
