import { Editor } from 'slate';
import { findSlateEditorBySelectionPath } from '../../utils/findSlateEditorBySelectionPath';
import { YooEditor } from '../types';

export function update(editor: YooEditor, format: any, value: any) {
  const slate = findSlateEditorBySelectionPath(editor);

  console.log('format', format);
  console.log('slate', slate?.selection);
  console.log('value', value);

  if (!slate) return;
  const marks = Editor.marks(slate) || {};

  Editor.addMark(slate, format.type, { ...marks, [format.type]: value });
}
