import { Editor } from 'slate';
import { findSlateEditorBySelectionPath } from '../../utils/findSlateEditorBySelectionPath';
import { YooEditor } from '../types';

export function update(editor: YooEditor, type: any, value: any) {
  const slate = findSlateEditorBySelectionPath(editor);

  if (!slate) return;
  Editor.addMark(slate, type, value);
  // editor.applyChanges();
}
